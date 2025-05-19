import React from 'react';
import styled from 'styled-components';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

const EditorContainer = styled.div`
  .ProseMirror {
    min-height: 200px;
    max-height: 500px;
    overflow-y: auto;
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    background-color: white;
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: 1.6;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }

    p {
      margin: 0;
    }

    h1, h2, h3 {
      margin: 1rem 0 0.5rem;
    }

    ul, ol {
      padding-left: 1.5rem;
    }

    a {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Toolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #f9f9f9;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-bottom: none;
  border-top-left-radius: ${({ theme }) => theme.borderRadius.small};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: -1px;
`;

const ToolbarButton = styled.button<{ $isActive?: boolean }>`
  padding: 0.25rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ $isActive, theme }) => $isActive ? theme.colors.primary : 'white'};
  color: ${({ $isActive, theme }) => $isActive ? 'white' : theme.colors.black};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &:hover {
    background-color: ${({ $isActive, theme }) => $isActive ? theme.colors.primary : theme.colors.lightGray};
  }
`;

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Editor: React.FC<EditorProps> = ({ 
  value, 
  onChange, 
  placeholder = '내용을 입력하세요...' 
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <EditorContainer>
      <Toolbar>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          $isActive={editor.isActive('bold')}
        >
          굵게
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          $isActive={editor.isActive('italic')}
        >
          기울임
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          $isActive={editor.isActive('strike')}
        >
          취소선
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          $isActive={editor.isActive('heading', { level: 1 })}
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          $isActive={editor.isActive('heading', { level: 2 })}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          $isActive={editor.isActive('heading', { level: 3 })}
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          $isActive={editor.isActive('bulletList')}
        >
          글머리 기호
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          $isActive={editor.isActive('orderedList')}
        >
          번호 매기기
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const url = window.prompt('URL을 입력하세요:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          $isActive={editor.isActive('link')}
        >
          링크
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const url = window.prompt('이미지 URL을 입력하세요:');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          이미지
        </ToolbarButton>
      </Toolbar>
      <EditorContent editor={editor} />
    </EditorContainer>
  );
};

export default Editor;

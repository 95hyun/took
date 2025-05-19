import React, { useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// 스타일 컴포넌트
const EditorContainer = styled.div`
  .quill {
    border-radius: ${({ theme }) => theme.borderRadius.small};
    margin-bottom: 20px;
    
    .ql-toolbar {
      border-top-left-radius: ${({ theme }) => theme.borderRadius.small};
      border-top-right-radius: ${({ theme }) => theme.borderRadius.small};
      border-color: ${({ theme }) => theme.colors.lightGray};
      background-color: #f9f9f9;
    }
    
    .ql-container {
      border-bottom-left-radius: ${({ theme }) => theme.borderRadius.small};
      border-bottom-right-radius: ${({ theme }) => theme.borderRadius.small};
      border-color: ${({ theme }) => theme.colors.lightGray};
      min-height: 200px;
      font-size: ${({ theme }) => theme.fontSizes.md};
    }
    
    .ql-editor {
      min-height: 200px;
      max-height: 500px;
      overflow-y: auto;
    }
  }
`;

// Editor 컴포넌트 Props
interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Quill 에디터 모듈 설정
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

// Quill 에디터 포맷 설정
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link',
];

// Editor 컴포넌트
const Editor: React.FC<EditorProps> = ({ 
  value, 
  onChange, 
  placeholder = '내용을 입력하세요...' 
}) => {
  return (
    <EditorContainer>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </EditorContainer>
  );
};

export default Editor;

import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, TextArea } from '../common';
import { createComment } from '../../services/commentService';

// 스타일 컴포넌트
const FormContainer = styled.div`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

// CommentForm 컴포넌트 Props
interface CommentFormProps {
  postId: number;
  onCommentAdded: () => void;
}

// CommentForm 컴포넌트
const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 댓글 작성 핸들러
  const handleSubmit = async () => {
    if (!content.trim()) {
      setError('댓글 내용을 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createComment(postId, { content });
      setContent('');
      setError(null);
      onCommentAdded();
    } catch (err) {
      setError('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <FormContainer>
      <TextArea
        placeholder="댓글을 작성해보세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        error={error || undefined}
        fullWidth
      />
      <ButtonContainer>
        <Button
          onClick={handleSubmit}
          isLoading={isSubmitting}
          disabled={isSubmitting || !content.trim()}
          size="small"
        >
          댓글 작성
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default CommentForm;

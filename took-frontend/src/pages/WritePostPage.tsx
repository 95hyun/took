import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createPost } from '../services/postService';
import Editor from '../components/post/Editor';
import { 
  Alert, 
  Button, 
  Container, 
  Header
} from '../components/common';

// 스타일 컴포넌트
const WriteContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.black};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

// WritePostPage 컴포넌트
const WritePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 글 작성 제출 핸들러
  const handleSubmit = async () => {
    // 내용이 비어있는지 확인
    if (!content || content === '<p><br></p>') {
      setError('내용을 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await createPost({ content });
      navigate('/forest');
    } catch (err: any) {
      setError(err?.response?.data?.message || '게시글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 취소 버튼 핸들러
  const handleCancel = () => {
    if (content && content !== '<p><br></p>') {
      if (window.confirm('작성 중인 내용이 있습니다. 정말 취소하시겠습니까?')) {
        navigate('/forest');
      }
    } else {
      navigate('/forest');
    }
  };
  
  return (
    <Container>
      <Header />
      
      <WriteContainer>
        <Title>🎋 대나무숲에 외치기</Title>
        
        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError(null)}
          />
        )}
        
        <Editor
          value={content}
          onChange={setContent}
          placeholder="자유롭게 당신의 생각을 적어보세요..."
        />
        
        <ButtonGroup>
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            외치기
          </Button>
        </ButtonGroup>
      </WriteContainer>
    </Container>
  );
};

export default WritePostPage;

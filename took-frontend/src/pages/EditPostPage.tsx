import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPostById, updatePost } from '../services/postService';
import Editor from '../components/post/Editor';
import { 
  Alert, 
  Button, 
  Container, 
  Header,
  Loader
} from '../components/common';

// 스타일 컴포넌트
const EditContainer = styled.div`
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

// EditPostPage 컴포넌트
const EditPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 게시글 데이터 로드
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        navigate('/forest');
        return;
      }
      
      try {
        const post = await getPostById(Number(postId));
        
        // 자신의 글이 아니면 접근 불가
        if (!post.isMine) {
          navigate('/forest');
          return;
        }
        
        setContent(post.content);
        setOriginalContent(post.content);
        setIsLoading(false);
      } catch (err) {
        setError('게시글을 불러오는데 실패했습니다.');
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [postId, navigate]);
  
  // 글 수정 제출 핸들러
  const handleSubmit = async () => {
    // 내용이 비어있는지 확인
    if (!content || content === '<p><br></p>') {
      setError('내용을 입력해주세요.');
      return;
    }
    
    // 내용이 변경되지 않았는지 확인
    if (content === originalContent) {
      navigate(`/post/${postId}`);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await updatePost(Number(postId), { content });
      navigate(`/post/${postId}`);
    } catch (err: any) {
      setError(err?.response?.data?.message || '게시글 수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 취소 버튼 핸들러
  const handleCancel = () => {
    if (content !== originalContent) {
      if (window.confirm('변경 사항이 있습니다. 정말 취소하시겠습니까?')) {
        navigate(`/post/${postId}`);
      }
    } else {
      navigate(`/post/${postId}`);
    }
  };
  
  if (isLoading) {
    return <Loader fullPage />;
  }
  
  return (
    <Container>
      <Header />
      
      <EditContainer>
        <Title>글 수정하기</Title>
        
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
            수정하기
          </Button>
        </ButtonGroup>
      </EditContainer>
    </Container>
  );
};

export default EditPostPage;

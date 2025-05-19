import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts } from '../services/postService';
import { PostListResponse } from '../types/post';
import { useAuth } from '../hooks/useAuth';
import { 
  Alert, 
  Button, 
  Container, 
  Header, 
  Loader, 
  Pagination 
} from '../components/common';
import PostCard from '../components/post/PostCard';

// 스타일 컴포넌트
const ForestContainer = styled.div`
  position: relative;
  min-height: 400px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 50px 0;
  color: ${({ theme }) => theme.colors.gray};
  
  p {
    margin: 20px 0;
  }
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const FloatingButton = styled.button`
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #1B5E20;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// ForestPage 컴포넌트
const ForestPage: React.FC = () => {
  const navigate = useNavigate();
  const { teamName } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postData, setPostData] = useState<PostListResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  // 게시글 데이터 가져오기
  const fetchPosts = async (page: number = 0) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getPosts(page);
      setPostData(response);
    } catch (err) {
      setError('게시글을 불러오는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };
  
  // 페이지 로드 시 데이터 가져오기
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);
  
  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1); // API는 0-based pagination 사용
  };
  
  // 글쓰기 페이지 이동
  const handleWriteClick = () => {
    navigate('/write');
  };
  
  return (
    <Container>
      <Header />
      
      <ForestContainer>
        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError(null)}
          />
        )}
        
        {loading ? (
          <Loader fullPage />
        ) : (
          <>
            {postData && postData.content.length > 0 ? (
              <>
                {postData.content.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
                
                {postData.totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage + 1} // 사용자에게는 1-based로 표시
                    totalPages={postData.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <EmptyState>
                <EmptyIcon>🎋</EmptyIcon>
                <h2>아직 대나무숲에 외침이 없어요.</h2>
                <p>첫 번째 게시글을 작성해보세요!</p>
                <Button onClick={handleWriteClick}>글쓰기</Button>
              </EmptyState>
            )}
          </>
        )}
        
        <FloatingButton onClick={handleWriteClick}>+</FloatingButton>
      </ForestContainer>
    </Container>
  );
};

export default ForestPage;

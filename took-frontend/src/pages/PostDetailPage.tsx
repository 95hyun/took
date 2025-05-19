import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPostById, reactToPost, deletePost } from '../services/postService';
import { getCommentsByPostId } from '../services/commentService';
import { formatDate } from '../utils/dateUtils';
import { 
  Alert, 
  Button, 
  Card, 
  Container, 
  Header,
  Loader,
  Pagination
} from '../components/common';
import CommentForm from '../components/comment/CommentForm';
import CommentItem from '../components/comment/CommentItem';

// 스타일 컴포넌트
const DetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  
  &:hover {
    text-decoration: underline;
  }
`;

const PostContent = styled.div`
  margin-bottom: 20px;
  line-height: 1.6;
  
  p {
    margin-bottom: 1em;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: 15px;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const ReactionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ReactionButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: ${({ active, theme }) => 
    active ? theme.colors.bambooBackground : 'white'
  };
  color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.gray
  };
  cursor: pointer;
  
  &:hover {
    background-color: ${({ active, theme }) => 
      active ? theme.colors.bambooBackground : '#f5f5f5'
    };
  }
`;

const ManageButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const CommentsSection = styled.div`
  margin-top: 30px;
`;

const CommentHeader = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: 15px;
`;

// PostDetailPage 컴포넌트
const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [commentsCount, setCommentsCount] = useState(0);
  
  // 게시글 및 댓글 데이터 로드
  const fetchData = async () => {
    if (!postId) {
      navigate('/forest');
      return;
    }
    
    try {
      const postData = await getPostById(Number(postId));
      setPost(postData);
      
      const commentsData = await getCommentsByPostId(Number(postId), currentPage);
      setComments(commentsData.content);
      setTotalPages(commentsData.totalPages);
      setCommentsCount(commentsData.totalElements);
      
      setLoading(false);
    } catch (err) {
      setError('게시글을 불러오는데 실패했습니다.');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [postId, currentPage, navigate]);
  
  // 체크 반응 핸들러
  const handleCheck = async () => {
    if (!post) return;
    
    try {
      await reactToPost(post.id, { type: 'CHECK' });
      // 반응 후 게시글 데이터 다시 로드
      const updatedPost = await getPostById(post.id);
      setPost(updatedPost);
    } catch (err) {
      console.error('게시글 반응 오류:', err);
    }
  };
  
  // 좋아요 반응 핸들러
  const handleLike = async () => {
    if (!post) return;
    
    try {
      await reactToPost(post.id, { type: 'LIKE' });
      // 반응 후 게시글 데이터 다시 로드
      const updatedPost = await getPostById(post.id);
      setPost(updatedPost);
    } catch (err) {
      console.error('게시글 반응 오류:', err);
    }
  };
  
  // 게시글 수정 페이지 이동
  const handleEdit = () => {
    navigate(`/edit/${postId}`);
  };
  
  // 게시글 삭제 핸들러
  const handleDelete = async () => {
    if (!post) return;
    
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        await deletePost(post.id);
        navigate('/forest');
      } catch (err) {
        console.error('게시글 삭제 오류:', err);
        setError('게시글 삭제에 실패했습니다.');
      }
    }
  };
  
  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1); // API는 0-based pagination 사용
  };
  
  // 댓글 업데이트 핸들러
  const handleCommentUpdated = () => {
    fetchData();
  };
  
  if (loading) {
    return <Loader fullPage />;
  }
  
  return (
    <Container>
      <Header />
      
      <DetailContainer>
        <BackLink to="/forest">← 대나무숲으로 돌아가기</BackLink>
        
        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError(null)}
          />
        )}
        
        {post && (
          <Card>
            <PostMeta>
              <span>
                {formatDate(post.createdAt)}
                {post.updatedAt && ` (수정됨: ${formatDate(post.updatedAt)})`}
              </span>
            </PostMeta>
            
            <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
            
            <PostActions>
              <ReactionButtons>
                <ReactionButton 
                  active={post.hasChecked}
                  onClick={handleCheck}
                >
                  <span role="img" aria-label="체크">✅</span>
                  {post.checkCount}
                </ReactionButton>
                
                <ReactionButton 
                  active={post.hasLiked}
                  onClick={handleLike}
                >
                  <span role="img" aria-label="좋아요">❤️</span>
                  {post.likeCount}
                </ReactionButton>
              </ReactionButtons>
              
              {post.isMine && (
                <ManageButtons>
                  <Button 
                    variant="secondary" 
                    size="small"
                    onClick={handleEdit}
                  >
                    수정
                  </Button>
                  <Button 
                    variant="danger" 
                    size="small"
                    onClick={handleDelete}
                  >
                    삭제
                  </Button>
                </ManageButtons>
              )}
            </PostActions>
          </Card>
        )}
        
        <CommentsSection>
          <CommentHeader>댓글 {commentsCount}개</CommentHeader>
          
          <CommentForm 
            postId={Number(postId)} 
            onCommentAdded={handleCommentUpdated} 
          />
          
          {comments.length > 0 ? (
            <>
              {comments.map(comment => (
                <CommentItem 
                  key={comment.id} 
                  comment={comment} 
                  onCommentUpdated={handleCommentUpdated} 
                />
              ))}
              
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage + 1} // 사용자에게는 1-based로 표시
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <p>아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
          )}
        </CommentsSection>
      </DetailContainer>
    </Container>
  );
};

export default PostDetailPage;

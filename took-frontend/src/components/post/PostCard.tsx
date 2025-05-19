import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Card } from '../common';
import { Post } from '../../types/post';
import { formatRelativeTime } from '../../utils/dateUtils';

// 스타일 컴포넌트
const PostContent = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: 15px;
  word-break: break-word;
  line-height: 1.5;
  
  /* 3줄 이상 텍스트 생략 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const PostTime = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray};
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray};
`;

const MyPostIndicator = styled.span`
  background-color: ${({ theme }) => theme.colors.bambooBackground};
  color: ${({ theme }) => theme.colors.primary};
  padding: 2px 6px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  margin-left: 8px;
`;

// PostCard 컴포넌트
interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };
  
  // HTML 태그 제거
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };
  
  return (
    <Card clickable onClick={handleClick} margin="0 0 16px 0">
      <PostContent>
        {stripHtml(post.content)}
        {post.isMine && <MyPostIndicator>내 글</MyPostIndicator>}
      </PostContent>
      
      <PostFooter>
        <PostTime>{formatRelativeTime(post.createdAt)}</PostTime>
        
        <StatsContainer>
          <StatItem>
            <span role="img" aria-label="체크">✅</span>
            {post.checkCount}
          </StatItem>
          <StatItem>
            <span role="img" aria-label="좋아요">❤️</span>
            {post.likeCount}
          </StatItem>
          <StatItem>
            <span role="img" aria-label="댓글">💬</span>
            {post.commentCount}
          </StatItem>
        </StatsContainer>
      </PostFooter>
    </Card>
  );
};

export default PostCard;

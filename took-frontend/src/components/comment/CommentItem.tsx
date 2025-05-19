import React, { useState } from 'react';
import styled from 'styled-components';
import { Comment } from '../../types/comment';
import { formatRelativeTime } from '../../utils/dateUtils';
import { Button, TextArea } from '../common';
import { reactToComment, updateComment, deleteComment } from '../../services/commentService';

// 스타일 컴포넌트
const CommentContainer = styled.div`
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: #f9f9f9;
  margin-bottom: 12px;
`;

const CommentContent = styled.div`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  word-break: break-word;
`;

const CommentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray};
`;

const CommentTime = styled.span``;

const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ReactionButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: 0 4px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const EditButton = styled(ActionButton)`
  color: ${({ theme }) => theme.colors.primary};
`;

const DeleteButton = styled(ActionButton)`
  color: ${({ theme }) => theme.colors.error};
`;

const MyCommentIndicator = styled.span`
  background-color: ${({ theme }) => theme.colors.bambooBackground};
  color: ${({ theme }) => theme.colors.primary};
  padding: 1px 4px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  margin-left: 6px;
`;

const EditForm = styled.div`
  margin-top: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;

// CommentItem 컴포넌트 Props
interface CommentItemProps {
  comment: Comment;
  onCommentUpdated: () => void;
}

// CommentItem 컴포넌트
const CommentItem: React.FC<CommentItemProps> = ({ comment, onCommentUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 체크 반응 핸들러
  const handleCheck = async () => {
    try {
      await reactToComment(comment.id, { type: 'CHECK' });
      onCommentUpdated();
    } catch (err) {
      console.error('댓글 반응 오류:', err);
    }
  };
  
  // 좋아요 반응 핸들러
  const handleLike = async () => {
    try {
      await reactToComment(comment.id, { type: 'LIKE' });
      onCommentUpdated();
    } catch (err) {
      console.error('댓글 반응 오류:', err);
    }
  };
  
  // 댓글 수정 시작 핸들러
  const handleEditStart = () => {
    setIsEditing(true);
    setEditContent(comment.content);
  };
  
  // 댓글 수정 취소 핸들러
  const handleEditCancel = () => {
    setIsEditing(false);
    setError(null);
  };
  
  // 댓글 수정 제출 핸들러
  const handleEditSubmit = async () => {
    if (!editContent.trim()) {
      setError('댓글 내용을 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await updateComment(comment.id, { content: editContent });
      setIsEditing(false);
      onCommentUpdated();
    } catch (err) {
      setError('댓글 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 댓글 삭제 핸들러
  const handleDelete = async () => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      try {
        await deleteComment(comment.id);
        onCommentUpdated();
      } catch (err) {
        console.error('댓글 삭제 오류:', err);
      }
    }
  };
  
  return (
    <CommentContainer>
      {isEditing ? (
        <EditForm>
          <TextArea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            error={error || undefined}
            fullWidth
          />
          <ButtonGroup>
            <Button
              variant="secondary"
              size="small"
              onClick={handleEditCancel}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button
              size="small"
              onClick={handleEditSubmit}
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              저장
            </Button>
          </ButtonGroup>
        </EditForm>
      ) : (
        <>
          <CommentContent>
            {comment.content}
            {comment.isMine && <MyCommentIndicator>내 댓글</MyCommentIndicator>}
          </CommentContent>
          
          <CommentFooter>
            <CommentTime>{formatRelativeTime(comment.createdAt)}</CommentTime>
            
            <CommentActions>
              <ReactionButton onClick={handleCheck}>
                <span role="img" aria-label="체크">✅</span>
                {comment.checkCount}
              </ReactionButton>
              
              <ReactionButton onClick={handleLike}>
                <span role="img" aria-label="좋아요">❤️</span>
                {comment.likeCount}
              </ReactionButton>
              
              {comment.isMine && (
                <>
                  <EditButton onClick={handleEditStart}>수정</EditButton>
                  <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
                </>
              )}
            </CommentActions>
          </CommentFooter>
        </>
      )}
    </CommentContainer>
  );
};

export default CommentItem;

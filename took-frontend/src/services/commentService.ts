import api from './api';
import type {
  Comment,
  CommentCreateRequest,
  CommentUpdateRequest,
  CommentListResponse,
} from '../types/comment';
import type { ReactionRequest, ReactionResponse } from '../types/post';

/**
 * 댓글 목록 조회 API 호출
 */
export const getCommentsByPostId = async (
  postId: number,
  page: number = 0,
  size: number = 20
): Promise<CommentListResponse> => {
  try {
    const response = await api.get<CommentListResponse>(`/posts/${postId}/comments`, {
      params: { page, size }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 댓글 작성 API 호출
 */
export const createComment = async (
  postId: number,
  commentData: CommentCreateRequest
): Promise<Comment> => {
  try {
    const response = await api.post<Comment>(`/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 댓글 수정 API 호출
 */
export const updateComment = async (
  commentId: number,
  commentData: CommentUpdateRequest
): Promise<Comment> => {
  try {
    const response = await api.put<Comment>(`/comments/${commentId}`, commentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 댓글 삭제 API 호출
 */
export const deleteComment = async (commentId: number): Promise<void> => {
  try {
    await api.delete(`/comments/${commentId}`);
  } catch (error) {
    throw error;
  }
};

/**
 * 댓글 반응(체크/좋아요) API 호출
 */
export const reactToComment = async (
  commentId: number,
  reaction: ReactionRequest
): Promise<ReactionResponse> => {
  try {
    const response = await api.post<ReactionResponse>(`/comments/${commentId}/reactions`, reaction);
    return response.data;
  } catch (error) {
    throw error;
  }
};

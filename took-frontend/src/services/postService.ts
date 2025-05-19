import api from './api';
import type { 
  Post, 
  PostDetail, 
  PostCreateRequest, 
  PostUpdateRequest,
  PostListResponse,
  ReactionRequest,
  ReactionResponse
} from '../types/post';

/**
 * 게시글 목록 조회 API 호출
 */
export const getPosts = async (page: number = 0, size: number = 10): Promise<PostListResponse> => {
  try {
    const response = await api.get<PostListResponse>('/posts', {
      params: { page, size }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 게시글 상세 조회 API 호출
 */
export const getPostById = async (postId: number): Promise<PostDetail> => {
  try {
    const response = await api.get<PostDetail>(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 게시글 작성 API 호출
 */
export const createPost = async (postData: PostCreateRequest): Promise<Post> => {
  try {
    const response = await api.post<Post>('/posts', postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 게시글 수정 API 호출
 */
export const updatePost = async (postId: number, postData: PostUpdateRequest): Promise<Post> => {
  try {
    const response = await api.put<Post>(`/posts/${postId}`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 게시글 삭제 API 호출
 */
export const deletePost = async (postId: number): Promise<void> => {
  try {
    await api.delete(`/posts/${postId}`);
  } catch (error) {
    throw error;
  }
};

/**
 * 게시글 반응(체크/좋아요) API 호출
 */
export const reactToPost = async (postId: number, reaction: ReactionRequest): Promise<ReactionResponse> => {
  try {
    const response = await api.post<ReactionResponse>(`/posts/${postId}/reactions`, reaction);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface Post {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  checkCount: number;
  likeCount: number;
  commentCount: number;
  isMine: boolean;
}

export interface PostDetail extends Post {
  hasChecked: boolean;
  hasLiked: boolean;
}

export interface PostCreateRequest {
  content: string;
}

export interface PostUpdateRequest {
  content: string;
}

export interface ReactionRequest {
  type: 'CHECK' | 'LIKE';
}

export interface ReactionResponse {
  id: number;
  type: 'CHECK' | 'LIKE';
  active: boolean;
}

export interface PostListResponse {
  content: Post[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
}

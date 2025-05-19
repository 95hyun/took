export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  checkCount: number;
  likeCount: number;
  isMine: boolean;
}

export interface CommentDetail extends Comment {
  hasChecked: boolean;
  hasLiked: boolean;
}

export interface CommentCreateRequest {
  content: string;
}

export interface CommentUpdateRequest {
  content: string;
}

export interface CommentListResponse {
  content: Comment[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
}

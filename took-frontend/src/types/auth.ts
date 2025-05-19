// 로그인 요청
export interface LoginRequest {
  teamName: string;
  password: string;
}

// 로그인 응답
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  memberId: number;
  teamId: number;
  teamName: string;
}

// 팀 등록 요청
export interface RegisterTeamRequest {
  teamName: string;
  numberOfMembers: number;
}

// 팀 등록 응답
export interface RegisterTeamResponse {
  teamId: number;
  teamName: string;
  passwords: string[];
}

// 비밀번호 변경 요청
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// 인증 상태
export interface AuthState {
  isAuthenticated: boolean;
  memberId: number | null;
  teamId: number | null;
  teamName: string | null;
  isLoading: boolean;
  error: string | null;
}

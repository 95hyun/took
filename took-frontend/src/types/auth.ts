export interface LoginRequest {
  teamName: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  memberId: number;
  teamId: number;
  teamName: string;
}

export interface RegisterTeamRequest {
  teamName: string;
  numberOfMembers: number;
}

export interface RegisterTeamResponse {
  teamId: number;
  teamName: string;
  passwords: string[];
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  memberId: number | null;
  teamId: number | null;
  teamName: string | null;
  isLoading: boolean;
  error: string | null;
}

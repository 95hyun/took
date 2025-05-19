import api from './api';
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterTeamRequest, 
  RegisterTeamResponse, 
  ChangePasswordRequest 
} from '../types/auth';
import { setTokenToStorage, clearTokenFromStorage } from '../utils/tokenUtils';

/**
 * 로그인 API 호출
 */
export const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', loginData);
    
    const { accessToken, refreshToken, memberId, teamId, teamName } = response.data;
    
    // 토큰 및 사용자 정보 저장
    setTokenToStorage(accessToken, refreshToken, { memberId, teamId, teamName });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 팀 등록 API 호출
 */
export const registerTeam = async (registerData: RegisterTeamRequest): Promise<RegisterTeamResponse> => {
  try {
    const response = await api.post<RegisterTeamResponse>('/teams', registerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 비밀번호 변경 API 호출
 */
export const changePassword = async (passwordData: ChangePasswordRequest): Promise<void> => {
  try {
    await api.put('/members/password', passwordData);
  } catch (error) {
    throw error;
  }
};

/**
 * 로그아웃 처리
 */
export const logout = (): void => {
  clearTokenFromStorage();
};

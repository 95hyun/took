import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthState } from '../types/auth';
import { getUserInfoFromStorage, isAuthenticated } from '../utils/tokenUtils';
import { login, logout as logoutService } from '../services/authService';
import { LoginRequest } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  memberId: null,
  teamId: null,
  teamName: null,
  isLoading: true,
  error: null,
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    // 로컬 스토리지에서 인증 상태 복원
    const checkAuth = () => {
      const isUserAuthenticated = isAuthenticated();
      
      if (isUserAuthenticated) {
        const userInfo = getUserInfoFromStorage();
        
        setAuthState({
          isAuthenticated: true,
          memberId: userInfo?.memberId || null,
          teamId: userInfo?.teamId || null,
          teamName: userInfo?.teamName || null,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState({
          ...initialState,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (loginData: LoginRequest) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await login(loginData);
      
      setAuthState({
        isAuthenticated: true,
        memberId: response.memberId,
        teamId: response.teamId,
        teamName: response.teamName,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: '로그인에 실패했습니다. 팀명과 비밀번호를 확인해주세요.',
      }));
      throw error;
    }
  };

  const handleLogout = () => {
    logoutService();
    setAuthState({
      isAuthenticated: false,
      memberId: null,
      teamId: null,
      teamName: null,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

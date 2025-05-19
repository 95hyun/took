import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * 인증 관련 Context를 사용하기 위한 커스텀 훅
 * 로그인 상태, 사용자 정보, 로그인/로그아웃 함수를 제공합니다.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/tokenUtils';

// 페이지 컴포넌트
import LoginPage from './pages/LoginPage';
import RegisterTeamPage from './pages/RegisterTeamPage';
import PasswordResultPage from './pages/PasswordResultPage';
import ForestPage from './pages/ForestPage';
import PostDetailPage from './pages/PostDetailPage';
import WritePostPage from './pages/WritePostPage';
import EditPostPage from './pages/EditPostPage';
import ChangePasswordPage from './pages/ChangePasswordPage';

// 개발 중에는 모든 페이지에 직접 접근할 수 있도록 설정합니다.
const AppRouter = () => {
  return (
    <Routes>
      {/* 모든 라우트를 직접 접근 가능하게 설정 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register-team" element={<RegisterTeamPage />} />
      <Route path="/team-created" element={<PasswordResultPage />} />
      <Route path="/forest" element={<ForestPage />} />
      <Route path="/post/:postId" element={<PostDetailPage />} />
      <Route path="/write" element={<WritePostPage />} />
      <Route path="/edit/:postId" element={<EditPostPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      
      {/* 기본 라우트를 ForestPage로 설정 (개발 중에는 로그인 체크 없이) */}
      <Route path="/" element={<Navigate to="/forest" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;

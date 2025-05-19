import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/tokenUtils';
import LoginPage from './pages/LoginPage';

// 페이지 컴포넌트 (추후 구현)
// import RegisterTeamPage from './pages/RegisterTeamPage';
// import PasswordResultPage from './pages/PasswordResultPage';
// import ForestPage from './pages/ForestPage';
// import PostDetailPage from './pages/PostDetailPage';
// import WritePostPage from './pages/WritePostPage';
// import EditPostPage from './pages/EditPostPage';
// import ChangePasswordPage from './pages/ChangePasswordPage';

// 인증이 필요한 라우트를 위한 래퍼 컴포넌트
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* 공개 라우트 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register-team" element={<div>팀 등록 페이지 (개발 중)</div>} />
      <Route path="/team-created" element={<div>비밀번호 발급 결과 페이지 (개발 중)</div>} />
      
      {/* 보호된 라우트 */}
      <Route 
        path="/forest" 
        element={
          <ProtectedRoute>
            <div>대나무숲 메인 페이지 (개발 중)</div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/post/:postId" 
        element={
          <ProtectedRoute>
            <div>게시글 상세 페이지 (개발 중)</div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/write" 
        element={
          <ProtectedRoute>
            <div>글 작성 페이지 (개발 중)</div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/edit/:postId" 
        element={
          <ProtectedRoute>
            <div>글 수정 페이지 (개발 중)</div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/change-password" 
        element={
          <ProtectedRoute>
            <div>비밀번호 변경 페이지 (개발 중)</div>
          </ProtectedRoute>
        } 
      />
      
      {/* 기본 리다이렉트 */}
      <Route path="/" element={<Navigate to={isAuthenticated() ? "/forest" : "/login"} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;

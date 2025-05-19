import React from 'react';
import styled, { keyframes } from 'styled-components';

// 로더 사이즈 타입
type LoaderSize = 'small' | 'medium' | 'large';

// 로더 속성 타입
interface LoaderProps {
  size?: LoaderSize;
  fullPage?: boolean;
  color?: string;
}

// 스피너 애니메이션
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// 전체 페이지 로더 컨테이너
const FullPageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
`;

// 인라인 로더 컨테이너
const InlineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

// 스피너 스타일
const Spinner = styled.div<{ size: LoaderSize; color?: string }>`
  display: inline-block;
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spin} 0.8s linear infinite;
  
  ${({ size, theme, color }) => {
    const spinnerColor = color || theme.colors.primary;
    
    switch (size) {
      case 'small':
        return `
          width: 20px;
          height: 20px;
          border: 2px solid ${spinnerColor};
        `;
      case 'large':
        return `
          width: 48px;
          height: 48px;
          border: 4px solid ${spinnerColor};
        `;
      default: // medium
        return `
          width: 32px;
          height: 32px;
          border: 3px solid ${spinnerColor};
        `;
    }
  }}
`;

/**
 * 로딩 인디케이터 컴포넌트
 * 
 * @param size - 로더 크기 (small, medium, large)
 * @param fullPage - 전체 페이지 모드 여부
 * @param color - 로더 색상 (CSS 색상 값)
 */
const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  fullPage = false,
  color,
}) => {
  const spinner = <Spinner size={size} color={color} />;
  
  if (fullPage) {
    return (
      <FullPageContainer>
        {spinner}
      </FullPageContainer>
    );
  }
  
  return (
    <InlineContainer>
      {spinner}
    </InlineContainer>
  );
};

export default Loader;

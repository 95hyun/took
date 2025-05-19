import React, { ReactNode } from 'react';
import styled from 'styled-components';

// 컨테이너 크기 타입
type ContainerSize = 'small' | 'medium' | 'large' | 'full';

// 컨테이너 속성 타입
interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  padding?: string;
  margin?: string;
  center?: boolean;
}

// 컨테이너 스타일
const ContainerWrapper = styled.div<ContainerProps>`
  width: 100%;
  max-width: ${({ size }) => {
    switch (size) {
      case 'small':
        return '600px';
      case 'medium':
        return '800px';
      case 'large':
        return '1200px';
      case 'full':
      default:
        return '100%';
    }
  }};
  padding: ${({ padding }) => padding || '0 16px'};
  margin: ${({ margin, center }) => 
    center 
      ? (margin ? `${margin} auto` : '0 auto')
      : (margin || '0')
  };
  box-sizing: border-box;
`;

/**
 * 반응형 컨테이너 컴포넌트
 * 
 * @param children - 내부 콘텐츠
 * @param size - 컨테이너 최대 너비 (small, medium, large, full)
 * @param padding - 내부 여백 (CSS 값)
 * @param margin - 외부 여백 (CSS 값)
 * @param center - 가운데 정렬 여부
 */
const Container: React.FC<ContainerProps> = ({
  children,
  size = 'medium',
  padding,
  margin,
  center = true,
}) => {
  return (
    <ContainerWrapper
      size={size}
      padding={padding}
      margin={margin}
      center={center}
    >
      {children}
    </ContainerWrapper>
  );
};

export default Container;

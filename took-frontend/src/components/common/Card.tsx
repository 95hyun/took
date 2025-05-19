import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

// 카드 타입 (default, outlined)
type CardVariant = 'default' | 'outlined';

// 카드 속성 타입
interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  clickable?: boolean;
  onClick?: () => void;
  padding?: string;
  margin?: string;
}

// 카드 스타일 컴포넌트
const CardContainer = styled.div<CardProps>`
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ padding }) => padding || '20px'};
  margin: ${({ margin }) => margin || '0'};
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.2s ease;
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'outlined':
        return css`
          border: 1px solid ${theme.colors.lightGray};
          box-shadow: none;
        `;
      default: // default
        return css`
          border: none;
          box-shadow: ${theme.shadows.small};
        `;
    }
  }}
  
  ${({ clickable }) => clickable && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.medium};
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
`;

/**
 * 카드 컴포넌트
 * 
 * @param children - 카드 내용
 * @param variant - 카드 타입 (default, outlined)
 * @param clickable - 클릭 가능 여부
 * @param onClick - 클릭 핸들러
 * @param padding - 패딩 (CSS 값)
 * @param margin - 마진 (CSS 값)
 */
const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  clickable = false,
  onClick,
  padding,
  margin,
}) => {
  return (
    <CardContainer
      variant={variant}
      clickable={clickable}
      onClick={clickable ? onClick : undefined}
      padding={padding}
      margin={margin}
    >
      {children}
    </CardContainer>
  );
};

export default Card;

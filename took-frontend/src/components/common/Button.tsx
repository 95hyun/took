import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

// 버튼 타입 (primary, secondary, danger)
export type ButtonVariant = 'primary' | 'secondary' | 'danger';

// 버튼 크기 (small, medium, large)
export type ButtonSize = 'small' | 'medium' | 'large';

// 버튼 속성 타입
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

// 버튼 베이스 스타일
const ButtonBase = styled.button<{
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
  $isLoading?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  white-space: nowrap;
  
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  /* 크기별 스타일 */
  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return css`
          padding: 8px 12px;
          font-size: ${({ theme }) => theme.fontSizes.sm};
        `;
      case 'large':
        return css`
          padding: 12px 24px;
          font-size: ${({ theme }) => theme.fontSizes.lg};
        `;
      default: // medium (default)
        return css`
          padding: 10px 16px;
          font-size: ${({ theme }) => theme.fontSizes.md};
        `;
    }
  }}
  
  /* 타입별 스타일 */
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'secondary':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.bambooBackground};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.bambooBackground};
            transform: translateY(1px);
          }
        `;
      case 'danger':
        return css`
          background-color: ${theme.colors.error};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background-color: #B71C1C;
          }
          
          &:active:not(:disabled) {
            background-color: #B71C1C;
            transform: translateY(1px);
          }
        `;
      default: // primary (default)
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background-color: #1B5E20;
          }
          
          &:active:not(:disabled) {
            background-color: #1B5E20;
            transform: translateY(1px);
          }
        `;
    }
  }}
`;

// 로딩 스피너 컴포넌트
const LoadingSpinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

/**
 * 버튼 컴포넌트
 * 
 * @param variant - 버튼 타입 (primary, secondary, danger)
 * @param size - 버튼 크기 (small, medium, large)
 * @param fullWidth - 너비 100% 적용 여부
 * @param isLoading - 로딩 상태 여부
 * @param children - 버튼 내용
 * @param ...rest - 기타 버튼 속성
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  children,
  disabled,
  ...rest
}) => {
  return (
    <ButtonBase
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <LoadingSpinner />}
      {children}
    </ButtonBase>
  );
};

export default Button;

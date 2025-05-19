import React, { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

// 입력 필드 속성 타입
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

// 입력 필드 컨테이너 스타일
const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

// 레이블 스타일
const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

// 입력 필드 스타일
const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: 10px 12px;
  border: 1px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.error : theme.colors.lightGray
  };
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) => 
      hasError ? theme.colors.error : theme.colors.primary
    };
    box-shadow: 0 0 0 2px ${({ theme, hasError }) => 
      hasError 
        ? `${theme.colors.error}20` 
        : `${theme.colors.primary}20`
    };
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightGray};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

// 에러 메시지 스타일
const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.error};
  margin-top: 4px;
`;

/**
 * 입력 필드 컴포넌트
 * 
 * @param label - 입력 필드 레이블
 * @param error - 에러 메시지
 * @param fullWidth - 너비 100% 적용 여부
 * @param ...rest - 기타 입력 필드 속성
 */
const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  fullWidth = false,
  id,
  ...rest 
}) => {
  // 레이블용 id 생성
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  return (
    <InputContainer fullWidth={fullWidth}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <StyledInput
        id={inputId}
        hasError={!!error}
        {...rest}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;

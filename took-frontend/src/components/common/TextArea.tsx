import React, { TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

// 텍스트 영역 속성 타입
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

// 텍스트 영역 컨테이너 스타일
const TextAreaContainer = styled.div<{ fullWidth?: boolean }>`
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

// 텍스트 영역 스타일
const StyledTextArea = styled.textarea<{ hasError?: boolean }>`
  padding: 10px 12px;
  border: 1px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.error : theme.colors.lightGray
  };
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: inherit;
  min-height: 100px;
  resize: vertical;
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
 * 텍스트 영역 컴포넌트
 * 
 * @param label - 텍스트 영역 레이블
 * @param error - 에러 메시지
 * @param fullWidth - 너비 100% 적용 여부
 * @param ...rest - 기타 텍스트 영역 속성
 */
const TextArea: React.FC<TextAreaProps> = ({ 
  label, 
  error, 
  fullWidth = false,
  id,
  ...rest 
}) => {
  // 레이블용 id 생성
  const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
  
  return (
    <TextAreaContainer fullWidth={fullWidth}>
      {label && <Label htmlFor={textareaId}>{label}</Label>}
      <StyledTextArea
        id={textareaId}
        hasError={!!error}
        {...rest}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </TextAreaContainer>
  );
};

export default TextArea;

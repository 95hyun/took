import React from 'react';
import styled, { css } from 'styled-components';

// 알림 타입 (success, info, warning, error)
type AlertType = 'success' | 'info' | 'warning' | 'error';

// 알림 속성 타입
interface AlertProps {
  type?: AlertType;
  message: string;
  onClose?: () => void;
}

// 알림 스타일
const AlertContainer = styled.div<{ type: AlertType }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin-bottom: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  ${({ type, theme }) => {
    switch (type) {
      case 'success':
        return css`
          background-color: #E8F5E9;
          color: ${theme.colors.success};
          border-left: 4px solid ${theme.colors.success};
        `;
      case 'info':
        return css`
          background-color: #E3F2FD;
          color: #2196F3;
          border-left: 4px solid #2196F3;
        `;
      case 'warning':
        return css`
          background-color: #FFF8E1;
          color: ${theme.colors.warning};
          border-left: 4px solid ${theme.colors.warning};
        `;
      case 'error':
        return css`
          background-color: #FFEBEE;
          color: ${theme.colors.error};
          border-left: 4px solid ${theme.colors.error};
        `;
    }
  }}
`;

// 메시지 스타일
const Message = styled.p`
  margin: 0;
  flex: 1;
`;

// 닫기 버튼 스타일
const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 18px;
  margin-left: 12px;
  line-height: 1;
  opacity: 0.6;
  
  &:hover {
    opacity: 1;
  }
`;

/**
 * 알림 메시지 컴포넌트
 * 
 * @param type - 알림 타입 (success, info, warning, error)
 * @param message - 알림 메시지
 * @param onClose - 닫기 버튼 클릭 핸들러
 */
const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  onClose,
}) => {
  return (
    <AlertContainer type={type}>
      <Message>{message}</Message>
      {onClose && (
        <CloseButton onClick={onClose}>
          &times;
        </CloseButton>
      )}
    </AlertContainer>
  );
};

export default Alert;

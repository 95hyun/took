import React, { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import Button from './Button';

// 모달 속성 타입
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'small' | 'medium' | 'large';
}

// 애니메이션 키프레임
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// 오버레이 스타일
const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease-out;
`;

// 모달 컨테이너 스타일
const ModalContainer = styled.div<{ size: string }>`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.large};
  width: 100%;
  max-width: ${({ size }) => {
    switch (size) {
      case 'small':
        return '400px';
      case 'large':
        return '800px';
      default: // medium
        return '600px';
    }
  }};
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideIn} 0.3s ease-out;
`;

// 모달 헤더 스타일
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

// 모달 제목 스타일
const ModalTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.black};
`;

// 닫기 버튼 스타일
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1;
  
  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

// 모달 컨텐츠 스타일
const ModalContent = styled.div`
  padding: 20px;
`;

// 모달 푸터 스타일
const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
  gap: 10px;
`;

// 기본 푸터 스타일
const DefaultFooter = ({ onClose }: { onClose: () => void }) => (
  <Button variant="secondary" onClick={onClose}>닫기</Button>
);

/**
 * 모달 컴포넌트
 * 
 * @param isOpen - 모달 표시 여부
 * @param onClose - 닫기 버튼 클릭 핸들러
 * @param title - 모달 제목
 * @param children - 모달 내용
 * @param footer - 모달 푸터 (기본값: 닫기 버튼)
 * @param size - 모달 크기 (small, medium, large)
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
}) => {
  // 모달 외부 클릭 시 닫기
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <Overlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer size={size}>
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </ModalHeader>
        )}
        
        <ModalContent>{children}</ModalContent>
        
        <ModalFooter>
          {footer || <DefaultFooter onClose={onClose} />}
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;

import React from 'react';
import styled, { css } from 'styled-components';

// 페이지네이션 속성 타입
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

// 페이지네이션 컨테이너 스타일
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 5px;
`;

// 페이지 버튼 스타일
const PageButton = styled.button<{ isActive?: boolean; isDisabled?: boolean }>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
  
  ${({ isActive, theme }) => isActive && css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: 1px solid ${theme.colors.primary};
    
    &:hover {
      background-color: ${theme.colors.primary};
    }
  `}
  
  ${({ isDisabled }) => isDisabled && css`
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  `}
`;

// 구분자 스타일
const Separator = styled.span`
  margin: 0 5px;
`;

/**
 * 페이지네이션 컴포넌트
 * 
 * @param currentPage - 현재 페이지 번호
 * @param totalPages - 전체 페이지 수
 * @param onPageChange - 페이지 변경 핸들러
 * @param siblingCount - 현재 페이지 양쪽에 표시할 페이지 수 (기본값: 1)
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  // 페이지 범위 계산
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };
  
  // 페이지 목록 생성
  const createPagination = () => {
    // 표시할 페이지 수가 너무 적으면 모두 표시
    if (totalPages <= 5 + siblingCount * 2) {
      return range(1, totalPages);
    }
    
    // 현재 페이지 양쪽에 표시할 페이지 번호
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    
    // 분리자(...)를 표시할지 여부
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;
    
    // 첫 번째와 마지막 페이지는 항상 표시
    if (showLeftDots && showRightDots) {
      return [1, '...', ...range(leftSiblingIndex, rightSiblingIndex), '...', totalPages];
    }
    
    if (showLeftDots && !showRightDots) {
      return [1, '...', ...range(leftSiblingIndex, totalPages)];
    }
    
    if (!showLeftDots && showRightDots) {
      return [...range(1, rightSiblingIndex), '...', totalPages];
    }
    
    return range(1, totalPages);
  };
  
  const paginationItems = createPagination();
  
  // 이전 페이지 이동
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  // 다음 페이지 이동
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  return (
    <PaginationContainer>
      {/* 이전 버튼 */}
      <PageButton
        onClick={handlePrevious}
        isDisabled={currentPage === 1}
      >
        &lt;
      </PageButton>
      
      {/* 페이지 버튼 */}
      {paginationItems.map((item, index) => {
        if (item === '...') {
          return <Separator key={`separator-${index}`}>...</Separator>;
        }
        
        const page = item as number;
        return (
          <PageButton
            key={page}
            isActive={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageButton>
        );
      })}
      
      {/* 다음 버튼 */}
      <PageButton
        onClick={handleNext}
        isDisabled={currentPage === totalPages}
      >
        &gt;
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;

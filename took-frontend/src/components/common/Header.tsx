import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';

// 스타일 컴포넌트
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  margin-bottom: 32px;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const TeamName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray};
  margin-right: 20px;
`;

const ProfileButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &::after {
    content: "▼";
    font-size: 10px;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 150px;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: 10;
  overflow: hidden;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  margin-top: 5px;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px 15px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.black};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  }
`;

const LogoutItem = styled(DropdownItem)`
  color: ${({ theme }) => theme.colors.error};
`;

// Header 컴포넌트
const Header: React.FC = () => {
  const { teamName, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handlePasswordChange = () => {
    setIsDropdownOpen(false);
    navigate('/change-password');
  };
  
  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    navigate('/login');
  };
  
  // 드롭다운 외부 클릭 시 닫기
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && event.target instanceof Node) {
        const dropdown = document.querySelector('#profile-dropdown');
        if (dropdown && !dropdown.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  return (
    <HeaderContainer>
      <Logo to="/forest">🎋 Took 대나무숲</Logo>
      <Nav>
        {teamName && <TeamName>팀 {teamName}</TeamName>}
        <div style={{ position: 'relative' }} id="profile-dropdown">
          <ProfileButton onClick={handleProfileClick}>내 계정</ProfileButton>
          <Dropdown isOpen={isDropdownOpen}>
            <DropdownItem onClick={handlePasswordChange}>비밀번호 변경</DropdownItem>
            <LogoutItem onClick={handleLogout}>로그아웃</LogoutItem>
          </Dropdown>
        </div>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

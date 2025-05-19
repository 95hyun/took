import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Alert, 
  Button, 
  Container, 
  Card 
} from '../components/common';

// 스타일 컴포넌트
const ResultContainer = styled.div`
  max-width: 600px;
  margin: 50px auto 0;
`;

const Header = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 10px;
  font-size: 2rem;
`;

const Subheader = styled.h2`
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.2rem;
  font-weight: 400;
`;

const TeamInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.bambooBackground};
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const InfoItem = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;

const PasswordsContainer = styled.div`
  margin: 20px 0;
  padding: 15px;
`;

const PasswordItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const PasswordText = styled.span`
  font-family: monospace;
  font-size: 18px;
  letter-spacing: 2px;
`;

const CopyButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #1B5E20;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Warning = styled.p`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
`;

// PasswordResultPage 컴포넌트
const PasswordResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({});
  const [showAlert, setShowAlert] = useState(false);
  
  // location.state 값 검증
  if (!location.state || 
      !location.state.teamName || 
      !location.state.numberOfMembers || 
      !location.state.passwords ||
      !Array.isArray(location.state.passwords)) {
    navigate('/register-team');
    return null;
  }
  
  const { teamName, numberOfMembers, passwords } = location.state as {
    teamName: string;
    numberOfMembers: number;
    passwords: string[];
  };
  
  // 개별 비밀번호 복사
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopyStatus({ ...copyStatus, [index]: true });
        setTimeout(() => {
          setCopyStatus({ ...copyStatus, [index]: false });
        }, 2000);
      })
      .catch(() => {
        setShowAlert(true);
      });
  };
  
  // 모든 비밀번호 복사
  const copyAllPasswords = () => {
    const allPasswords = passwords.map((pw, i) => `비밀번호 ${i+1}: ${pw}`).join('\n');
    
    navigator.clipboard.writeText(allPasswords)
      .then(() => {
        setCopyStatus({ ...copyStatus, allCopied: true });
        setTimeout(() => {
          setCopyStatus({ ...copyStatus, allCopied: false });
        }, 2000);
      })
      .catch(() => {
        setShowAlert(true);
      });
  };
  
  const handleLoginClick = () => {
    navigate('/login');
  };
  
  return (
    <Container>
      <ResultContainer>
        {showAlert && (
          <Alert
            type="error"
            message="비밀번호 복사에 실패했습니다. 수동으로 복사해주세요."
            onClose={() => setShowAlert(false)}
          />
        )}
        
        <Header>팀이 성공적으로 생성되었습니다!</Header>
        <Subheader>팀원들에게 비밀번호를 공유해주세요</Subheader>
        
        <Card>
          <TeamInfo>
            <InfoItem><strong>팀명:</strong> {teamName}</InfoItem>
            <InfoItem><strong>팀원 수:</strong> {numberOfMembers}명</InfoItem>
          </TeamInfo>
          
          <PasswordsContainer>
            <h3>발급된 비밀번호</h3>
            {passwords.map((password, index) => (
              <PasswordItem key={index}>
                <PasswordText>비밀번호 {index+1}: {password}</PasswordText>
                <CopyButton 
                  onClick={() => copyToClipboard(password, index)}
                  disabled={copyStatus[index.toString()]}
                >
                  {copyStatus[index.toString()] ? '복사됨!' : '복사'}
                </CopyButton>
              </PasswordItem>
            ))}
          </PasswordsContainer>
          
          <Button 
            onClick={copyAllPasswords}
            disabled={!!copyStatus.allCopied}
            fullWidth
          >
            {copyStatus.allCopied ? '모든 비밀번호가 복사되었습니다!' : '모든 비밀번호 복사하기'}
          </Button>
          
          <Warning>
            비밀번호는 팀원들에게만 안전하게 공유해주세요!
          </Warning>
          
          <Button
            onClick={handleLoginClick}
            fullWidth
            variant="secondary"
            margin="20px 0 0 0"
          >
            로그인 페이지로 이동
          </Button>
        </Card>
      </ResultContainer>
    </Container>
  );
};

export default PasswordResultPage;

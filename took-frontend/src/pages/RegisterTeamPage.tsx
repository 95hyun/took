import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from '../hooks/useForm';
import { registerTeam } from '../services/authService';
import { 
  Alert, 
  Button, 
  Container, 
  Input 
} from '../components/common';

// 스타일 컴포넌트
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const RegisterContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border-radius: 12px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  margin: 0 auto;
`;

const Header = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &::before {
    content: '🎋';
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

// RegisterTeamPage 컴포넌트
const RegisterTeamPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  const { 
    values, 
    handleChange, 
    isSubmitting, 
    setIsSubmitting 
  } = useForm({
    teamName: '',
    numberOfMembers: 5
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!values.teamName.trim()) {
      setError('팀명을 입력해주세요.');
      return;
    }
    
    if (isNaN(Number(values.numberOfMembers)) || Number(values.numberOfMembers) < 2) {
      setError('팀원 수는 2명 이상이어야 합니다.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await registerTeam({
        teamName: values.teamName,
        numberOfMembers: Number(values.numberOfMembers)
      });
      
      // 비밀번호 발급 결과 페이지로 이동
      navigate('/team-created', { 
        state: { 
          teamName: response.teamName,
          numberOfMembers: Number(values.numberOfMembers),
          passwords: response.passwords
        } 
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || '팀 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleBack = () => {
    navigate('/login');
  };
  
  return (
    <PageWrapper>
      <RegisterContainer>
        <Header>팀 등록하기</Header>
        
        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError(null)}
          />
        )}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              label="팀명"
              name="teamName"
              value={values.teamName}
              onChange={handleChange}
              placeholder="팀명을 입력하세요"
              fullWidth
              disabled={isSubmitting}
            />
          </FormGroup>
          
          <FormGroup>
            <Input
              label="팀원 수"
              type="number"
              name="numberOfMembers"
              min={2}
              max={50}
              value={values.numberOfMembers.toString()}
              onChange={handleChange}
              fullWidth
              disabled={isSubmitting}
            />
          </FormGroup>
          
          <ButtonGroup>
            <Button
              type="button"
              variant="secondary"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              뒤로 가기
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              팀 생성하기
            </Button>
          </ButtonGroup>
        </Form>
      </RegisterContainer>
    </PageWrapper>
  );
};

export default RegisterTeamPage;

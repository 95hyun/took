import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { Button, Container, Input, Alert } from '../components/common';

// 스타일 컴포넌트
const LoginContainer = styled.div`
  max-width: 400px;
  margin: 100px auto 0;
  padding: 30px;
  border-radius: 8px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const RegisterLink = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  text-decoration: underline;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

// LoginPage 컴포넌트
const LoginPage: React.FC = () => {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const { values, handleChange, isSubmitting, setIsSubmitting } = useForm({
    teamName: '',
    password: ''
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    
    if (!values.teamName.trim()) {
      setLoginError('팀명을 입력해주세요.');
      return;
    }
    
    if (!values.password.trim()) {
      setLoginError('비밀번호를 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login({
        teamName: values.teamName,
        password: values.password
      });
      navigate('/forest');
    } catch (err) {
      setLoginError('로그인에 실패했습니다. 팀명과 비밀번호를 확인해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRegisterClick = () => {
    navigate('/register-team');
  };
  
  return (
    <Container>
      <LoginContainer>
        <Title>🎋 Took 대나무숲</Title>
        
        {(loginError || error) && (
          <Alert
            type="error"
            message={loginError || error || ''}
            onClose={() => setLoginError(null)}
          />
        )}
        
        <Form onSubmit={handleSubmit}>
          <Input
            label="팀명"
            name="teamName"
            value={values.teamName}
            onChange={handleChange}
            placeholder="팀명을 입력하세요"
            fullWidth
            disabled={isSubmitting}
          />
          
          <Input
            label="비밀번호"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            fullWidth
            disabled={isSubmitting}
          />
          
          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting || isLoading}
            disabled={isSubmitting || isLoading}
            margin="20px 0 0 0"
          >
            로그인
          </Button>
        </Form>
        
        <RegisterLink>
          <LinkButton type="button" onClick={handleRegisterClick}>
            팀 등록을 원하시나요?
          </LinkButton>
        </RegisterLink>
      </LoginContainer>
    </Container>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { changePassword } from '../services/authService';
import { useForm } from '../hooks/useForm';
import { 
  Alert, 
  Button, 
  Container, 
  Header,
  Input
} from '../components/common';

// 스타일 컴포넌트
const PasswordContainer = styled.div`
  max-width: 500px;
  margin: 50px auto 0;
  padding: 30px;
  border-radius: 8px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

// ChangePasswordPage 컴포넌트
const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const { 
    values, 
    handleChange, 
    isSubmitting, 
    setIsSubmitting,
    errors,
    setError: setFieldError
  } = useForm({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // 폼 유효성 검사
  const validate = () => {
    let isValid = true;
    
    if (!values.currentPassword) {
      setFieldError('currentPassword', '현재 비밀번호를 입력해주세요.');
      isValid = false;
    }
    
    if (!values.newPassword) {
      setFieldError('newPassword', '새 비밀번호를 입력해주세요.');
      isValid = false;
    } else if (values.newPassword.length < 6) {
      setFieldError('newPassword', '비밀번호는 최소 6자 이상이어야 합니다.');
      isValid = false;
    }
    
    if (values.newPassword !== values.confirmPassword) {
      setFieldError('confirmPassword', '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      isValid = false;
    }
    
    return isValid;
  };
  
  // 비밀번호 변경 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      });
      
      setSuccess('비밀번호가 성공적으로 변경되었습니다.');
      
      // 3초 후 메인 페이지로 이동
      setTimeout(() => {
        navigate('/forest');
      }, 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || '비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 취소 버튼 핸들러
  const handleCancel = () => {
    navigate('/forest');
  };
  
  return (
    <Container>
      <Header />
      
      <PasswordContainer>
        <Title>비밀번호 변경</Title>
        
        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError(null)}
          />
        )}
        
        {success && (
          <Alert
            type="success"
            message={success}
          />
        )}
        
        <Form onSubmit={handleSubmit}>
          <Input
            label="현재 비밀번호"
            type="password"
            name="currentPassword"
            value={values.currentPassword}
            onChange={handleChange}
            error={errors.currentPassword}
            fullWidth
            disabled={isSubmitting || !!success}
          />
          
          <Input
            label="새 비밀번호"
            type="password"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
            fullWidth
            disabled={isSubmitting || !!success}
          />
          
          <Input
            label="새 비밀번호 확인"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            fullWidth
            disabled={isSubmitting || !!success}
          />
          
          <ButtonGroup>
            <Button
              variant="secondary"
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting || !!success}
            >
              취소
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting || !!success}
            >
              변경하기
            </Button>
          </ButtonGroup>
        </Form>
      </PasswordContainer>
    </Container>
  );
};

export default ChangePasswordPage;

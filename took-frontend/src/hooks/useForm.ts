import { useState, ChangeEvent, FormEvent } from 'react';

/**
 * 폼 상태 관리를 위한 커스텀 훅
 * @param initialValues 초기 폼 데이터
 */
export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 입력 필드 값 변경 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    
    // 에러 메시지 초기화
    if (errors[name as keyof T]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // 폼 초기화
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  // 에러 설정
  const setError = (name: keyof T, message: string) => {
    setErrors(prev => ({
      ...prev,
      [name]: message,
    }));
  };

  return {
    values,
    errors,
    isSubmitting,
    setValues,
    handleChange,
    setErrors,
    setError,
    setIsSubmitting,
    resetForm,
  };
};

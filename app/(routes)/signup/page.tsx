'use client';

import Header from '@/components/atoms/Headers/Header';
import SignUpInput from '@/components/atoms/Inputs/SignupIput';
import { useState } from 'react';

type FormData = {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  residentNum: string;
  gender: string;
};

type Input = {
  type: keyof FormData;
  inputType: string;
  question: string;
  placeholder: string;
  validate: (value: string) => boolean;
  errorMessage: string;
};

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    residentNum: '',
    gender: '',
  });

  const questions: Input[] = [
    {
      type: 'id',
      inputType: 'text',
      question: '아이디를 입력해주세요',
      placeholder: '아이디 입력',
      validate: (value: string) => /^[a-zA-Z0-9]{4,12}$/.test(value),
      errorMessage: '아이디는 4-12자의 영문자와 숫자로만 입력해주세요',
    },
    {
      type: 'password',
      inputType: 'password',
      question: '비밀번호를 입력해주세요',
      placeholder: '비밀번호 입력',
      validate: (value: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/.test(value),
      errorMessage: '비밀번호는 8-20자의 영문자, 숫자, 특수문자로 입력해주세요',
    },
    {
      type: 'passwordConfirm',
      inputType: 'password',
      question: '비밀번호를 입력해주세요',
      placeholder: '비밀번호 입력',
      validate: (value: string) => value === formData.password,
      errorMessage: '비밀번호가 일치하지 않습니다',
    },
    {
      type: 'name',
      inputType: 'text',
      question: '이름을 입력해주세요',
      placeholder: '홍길동',
      validate: (value: string) => value.length >= 2,
      errorMessage: '이름은 2자 이상 입력해주세요',
    },
    {
      type: 'phone',
      inputType: 'text',
      question: '전화번호를 입력해주세요',
      placeholder: '01012345678',
      validate: (value: string) => /^\d{10,11}$/.test(value),
      errorMessage: '올바른 전화번호 형식이 아닙니다',
    },
    {
      type: 'residentNum',
      inputType: 'text',
      question: '주민등록번호를 입력해주세요',
      placeholder: '주민등록번호 입력',
      validate: (value: string) => /^\d{13}$/.test(value),
      errorMessage: '주민등록번호는 13자리 숫자로 입력해주세요',
    },
    {
      type: 'gender',
      inputType: 'text',
      question: '성별을 선택해주세요',
      placeholder: '남성',
      validate: (value: string) => ['male', 'female'].includes(value),
      errorMessage: '성별은 male 또는 female로 입력해주세요',
    },
  ];

  const handleChange = (key: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className='h-screen'>
      <Header title='회원가입' />
      <div className='p-4 space-y-4'>
        {questions.map((question, index) => (
          <SignUpInput
            key={question.type}
            inputType={question.inputType}
            value={formData[question.type]}
            onChange={handleChange(question.type)}
            question={question.question}
            placeholder={question.placeholder}
            validate={question.validate}
            errorMessage={question.errorMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default SignUp;

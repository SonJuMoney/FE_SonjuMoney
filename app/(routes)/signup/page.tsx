'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import SignUpInput from '@/components/atoms/Inputs/SignupIput';
import { useEffect, useState } from 'react';

type FormData = {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  residentNum: string;
};

type Input = {
  type: keyof FormData;
  inputType: string;
  question: string;
  placeholder: string;
  validate: (value: string) => boolean;
  errorMessage: string;
  width: number;
};

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    residentNum: '',
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const questions: Input[] = [
    {
      type: 'id',
      inputType: 'text',
      question: '아이디를 입력해주세요',
      placeholder: '아이디 입력',
      validate: (value: string) => /^[a-zA-Z0-9]{4,12}$/.test(value),
      errorMessage: '영문자, 숫자(4-12)',
      width: 14,
    },
    {
      type: 'password',
      inputType: 'password',
      question: '비밀번호를 입력해주세요',
      placeholder: '비밀번호 입력',
      validate: (value: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/.test(value),
      errorMessage: '영문자, 숫자, 특수문자(8-20)',
      width: 14,
    },
    {
      type: 'passwordConfirm',
      inputType: 'password',
      question: '비밀번호를 입력해주세요',
      placeholder: '비밀번호 입력',
      validate: (value: string) => value === formData.password,
      errorMessage: '비밀번호가 일치하지 않습니다',
      width: 14,
    },
    {
      type: 'name',
      inputType: 'text',
      question: '이름을 입력해주세요',
      placeholder: '홍길동',
      validate: (value: string) => value.length >= 2,
      errorMessage: '2자 이상 입력해주세요',
      width: 10,
    },
    {
      type: 'phone',
      inputType: 'text',
      question: '전화번호를 입력해주세요',
      placeholder: '010-1234-5678',
      validate: (value: string) => /^010\d{8}$/.test(value),
      errorMessage: '올바른 형식이 아닙니다',
      width: 16,
    },
    {
      type: 'residentNum',
      inputType: 'text',
      question: '주민등록번호를 입력해주세요',
      placeholder: '900101 - 2******',
      validate: (value: string) => value.replace(/\D/g, '').length === 13,
      errorMessage: '올바른 형식이 아닙니다',
      width: 17,
    },
  ];

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (key: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleValidation = (isValid: boolean) => {
    if (isValid && currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const isFormComplete =
    currentIndex === questions.length - 1 &&
    questions.every((q) => q.validate(formData[q.type]));

  return (
    <div className='h-screen flex flex-col justify-between'>
      <Header title='회원가입' />
      <div className='p-5 flex-grow overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
        {questions.map(
          (question, index) =>
            index <= currentIndex && (
              <SignUpInput
                key={question.type}
                id={question.type}
                inputType={question.inputType}
                onChange={handleChange(question.type)}
                question={question.question}
                placeholder={question.placeholder}
                validate={question.validate}
                errorMessage={question.errorMessage}
                onValidation={handleValidation}
                width={question.width}
              />
            )
        )}
      </div>
      <div className='px-5 pb-5'>
        <ButtonLarge text='회원가입' disabled={!isFormComplete} />
      </div>
    </div>
  );
};

export default SignUp;

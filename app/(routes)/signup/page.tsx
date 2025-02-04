'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import SignUpInput from '@/components/atoms/Inputs/SignupIput';
import { useToast } from '@/hooks/use-toast';
import useSignUpStore, { SignUpData } from '@/store/useSignupStore';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type Input = {
  type: keyof SignUpData;
  inputType: string;
  question: string;
  placeholder: string;
  validate: (value: string) => boolean | Promise<ValidationResult>;
  errorMessage: string;
  width: number;
};

type ValidationResult = { isValid: boolean; error: string };

const SignUp = () => {
  const router = useRouter();
  const setSignUpData = useSignUpStore((state) => state.setSignUpData);
  const { toast } = useToast();

  const [userData, setUserData] = useState<SignUpData>({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    residentNum: '',
  });

  const [validations, setValidations] = useState<
    Record<keyof SignUpData, boolean>
  >({
    id: false,
    password: false,
    passwordConfirm: false,
    name: false,
    phone: false,
    residentNum: false,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const checkIdValidation = async (id: string) => {
    if (!/^[a-zA-Z0-9]{4,12}$/.test(id)) {
      return {
        isValid: false,
        error: '영문자, 숫자(4-12)',
      };
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/id-duplication?id=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        return {
          isValid: false,
          error: '아이디 조회 중 오류가 발생했습니다',
        };
      }

      const data = await response.json();

      return {
        isValid: !data.duplication,
        error: data.duplication ? '중복된 아이디입니다' : '',
      };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        isValid: false,
        error: '서버 오류가 발생했습니다',
      };
    }
  };

  const checkPhoneValidation = async (phone: string) => {
    if (!/^010\d{8}$/.test(phone)) {
      return {
        isValid: false,
        error: '올바른 형식이 아닙니다',
      };
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/phone-duplication?phone=${phone}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        return {
          isValid: false,
          error: '휴대폰 번호 조회 중 오류가 발생했습니다',
        };
      }

      const data = await response.json();

      return {
        isValid: !data.duplication,
        error: data.duplication ? '이미 가입 된 휴대폰 번호입니다' : '',
      };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        isValid: false,
        error: '서버 오류가 발생했습니다',
      };
    }
  };

  const checkResidentValidation = async (resident: string) => {
    if (resident.length < 13) {
      return {
        isValid: false,
        error: '주민등록번호 13자리를 모두 입력해주세요',
      };
    }

    const cleanResident = resident.replace(/-/g, '');
    if (cleanResident.length !== 13) {
      return {
        isValid: false,
        error: '13자리를 입력해주세요',
      };
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resident-duplication?resident=${resident}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        return {
          isValid: false,
          error: '주민등록번호 조회 중 오류가 발생했습니다',
        };
      }

      const data = await response.json();

      return {
        isValid: !data.duplication,
        error: data.duplication ? '이미 가입된 주민등록 번호입니다' : '',
      };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        isValid: false,
        error: '서버 오류가 발생했습니다',
      };
    }
  };

  const questions: Input[] = [
    {
      type: 'id',
      inputType: 'text',
      question: '아이디를 입력해주세요',
      placeholder: '아이디 입력',
      validate: checkIdValidation,
      errorMessage: '',
      width: 14,
    },
    {
      type: 'password',
      inputType: 'password',
      question: '비밀번호를 입력해주세요',
      placeholder: '비밀번호 입력',
      validate: (value: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,20}$/.test(
          value
        ),
      errorMessage: '영문자, 숫자, 특수문자(8-20)',
      width: 14,
    },
    {
      type: 'passwordConfirm',
      inputType: 'password',
      question: '비밀번호를 한번 더 입력해주세요',
      placeholder: '비밀번호 입력',
      validate: (value: string) => value === userData.password,
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
      validate: checkPhoneValidation,
      errorMessage: '올바른 형식이 아닙니다',
      width: 16,
    },
    {
      type: 'residentNum',
      inputType: 'text',
      question: '주민등록번호를 입력해주세요',
      placeholder: '900101 - 2******',
      validate: checkResidentValidation,
      errorMessage: '올바른 형식이 아닙니다',
      width: 17,
    },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentIndex]);

  const handleChange = (key: keyof SignUpData) => (value: string) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  const handleValidation = (id: keyof SignUpData, isValid: boolean) => {
    setValidations((prev) => ({
      ...prev,
      [id]: isValid,
    }));

    const myIndex = questions.findIndex((q) => q.type === id);
    const isCurrentQuestion = myIndex === currentIndex;

    const questionsToValidate = isCurrentQuestion
      ? questions.slice(0, currentIndex)
      : questions
          .slice(0, currentIndex + 1)
          .filter((_, index) => index !== myIndex);

    const allPreviousValid = questionsToValidate.every(
      (q) => validations[q.type]
    );

    if (isValid && allPreviousValid && currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleOnClick = () => {
    if (!isFormComplete) {
      toast({ title: '모든 정보를 알맞게 입력해주세요' });
      return;
    }
    setSignUpData(userData);
    router.push('/signup/setPin');
  };

  // const isFormComplete =
  //   currentIndex === questions.length - 1 &&
  //   Object.values(validations).every((isValid) => isValid);

  const isFormComplete = Object.values(validations).every((isValid) => isValid);

  return (
    <div className='h-screen flex flex-col justify-between'>
      <Header title='회원가입' />
      <div
        ref={scrollRef}
        className='p-5 flex-grow overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
      >
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
        <ButtonLarge
          text='회원가입'
          disabled={!isFormComplete}
          onClick={handleOnClick}
        />
      </div>
    </div>
  );
};

export default SignUp;

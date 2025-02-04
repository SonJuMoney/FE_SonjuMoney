'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import SignUpInput from '@/components/atoms/Inputs/SignupIput';
import { useToast } from '@/hooks/use-toast';
import { useAuthApi } from '@/hooks/useAuthApi/useAuthApi';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type Input = {
  type: keyof ChildData;
  inputType: string;
  question: string;
  placeholder: string;
  validate: (value: string) => boolean | Promise<ValidationResult>;
  errorMessage: string;
  width: number;
};

type ValidationResult = { isValid: boolean; error: string };

type ChildData = {
  id: string;
  name: string;
  residentNum: string;
};

const SignUp = () => {
  const router = useRouter();
  const { signupChild } = useAuthApi();

  const [childData, setChildData] = useState<ChildData>({
    id: '',
    name: '',
    residentNum: '',
  });

  const [validations, setValidations] = useState<
    Record<keyof ChildData, boolean>
  >({
    id: false,
    name: false,
    residentNum: false,
  });
  const { toast } = useToast();
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
      type: 'name',
      inputType: 'text',
      question: '이름을 입력해주세요',
      placeholder: '홍길동',
      validate: (value: string) => value.length >= 2,
      errorMessage: '2자 이상 입력해주세요',
      width: 10,
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

  const handleChange = (key: keyof ChildData) => (value: string) => {
    setChildData((prev) => ({ ...prev, [key]: value }));
  };

  const handleValidation = (id: keyof ChildData, isValid: boolean) => {
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

  const handleOnClick = async () => {
    if (!isFormComplete) {
      toast({ title: '모든 정보를 알맞게 입력해주세요' });

      return;
    }

    const response = await signupChild(childData);
    if (response) {
      router.push(`/register/account?userId=${response}`);
    } else {
      return;
    }
  };

  const isFormComplete =
    currentIndex === questions.length - 1 &&
    Object.values(validations).every((isValid) => isValid);

  return (
    <div className='h-screen flex flex-col justify-between'>
      <Header title='자녀계정 등록하기' />
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

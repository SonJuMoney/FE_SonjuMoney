import SignUpInput from '@/components/atoms/Inputs/SignupIput';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SignUpInput> = {
  title: 'Components/Input/SignUpInput',
  component: SignUpInput,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    onValidation: { action: 'validated' },
    validate: { action: 'validated' },
    errorMessage: { control: 'text' },
  },
};

const mockValidate = (value: string) => {
  return new Promise<{ isValid: boolean; error: string }>((resolve) => {
    setTimeout(() => {
      if (value.length < 3) {
        resolve({ isValid: false, error: '입력값이 너무 짧습니다.' });
      } else {
        resolve({ isValid: true, error: '' });
      }
    }, 1000);
  });
};

export const Name: StoryObj<typeof meta> = {
  args: {
    id: 'name',
    inputType: 'text',
    onChange: (value: string) =>
      console.log('Name input value changed: ', value),
    question: '이름을 입력해주세요',
    placeholder: '이름',
    validate: mockValidate,
    errorMessage: '이름 오류',
    onValidation: (id: string, isValid: boolean) =>
      console.log(id, isValid ? 'Valid' : 'Invalid'),
    width: 10,
  },
};

export const ResidentNumber: StoryObj<typeof meta> = {
  args: {
    id: 'residentNum',
    inputType: 'text',
    onChange: (value: string) =>
      console.log('Resident number input value changed: ', value),
    question: '주민등록번호를 입력해주세요',
    placeholder: '주민등록번호',
    validate: mockValidate,
    errorMessage: '주민등록번호 오류',
    onValidation: (id: string, isValid: boolean) =>
      console.log(id, isValid ? 'Valid' : 'Invalid'),
    width: 20,
  },
};

export default meta;

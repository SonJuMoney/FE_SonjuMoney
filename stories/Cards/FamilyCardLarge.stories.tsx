import FamilyCardLarge from '@/components/atoms/Cards/FamilyCardLarge';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FamilyCardLarge> = {
  title: 'Components/Cards/FamilyCardLarge',
  component: FamilyCardLarge,
  argTypes: {
    familyName: { control: 'text' },
    familyMember: { control: 'object' },
    color: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export type TMember = {
  member_id: number;
  user_id: number;
  member_name: string;
  member_role: string;
  profile_link: string | null;
};

// 목 데이터
const mockFamilyMembers = [
  {
    member_id: 1,
    user_id: 1,
    member_name: '박준용',
    member_role: '할아버지',
    profile_link: null,
  },
  {
    member_id: 2,
    user_id: 2,
    member_name: '김미진',
    member_role: '엄마',
    profile_link: null,
  },
  {
    member_id: 3,
    user_id: 3,
    member_name: '길유정',
    member_role: '딸',
    profile_link: null,
  },
  {
    member_id: 4,
    user_id: 4,
    member_name: '임형석',
    member_role: '아들',
    profile_link: null,
  },
];

export const Family: StoryObj<typeof meta> = {
  args: {
    familyName: '첫째네 가족',
    familyMember: mockFamilyMembers,
    color: 'bg-appColor',
  },
};

export default meta;

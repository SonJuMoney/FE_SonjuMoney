'use client';

import Header from '@/components/atoms/Headers/Header';
import PasswordForm from '@/components/molecules/Forms/PasswordForm';
import { useAllowanceApi } from '@/hooks/useAllowanceApi/useAllowanceApi';
import useSendAllowanceStore from '@/store/useSendAllowanceStore';
import { TSendAllowanceReq } from '@/types/Allowance';

const EnterPasscode = () => {
  const { selectedFamily, selectedMember, amount, message, files } =
    useSendAllowanceStore();

  const { sendAllowance } = useAllowanceApi();

  const selectedMemberData = selectedFamily?.members.find(
    (member) => member.member_name === selectedMember
  );

  if (!selectedMemberData) {
    console.error('Selected member not found!');
    return;
  }

  const onComplete = (data: TSendAllowanceReq) => {
    console.log(data);
    return sendAllowance(data);
  };

  return (
    <div className='pageLayout'>
      <Header title='용돈 보내기' />

      <div className='defaultLayout'>
        <PasswordForm
          type='Passcode'
          text={`간편 비밀번호를 
입력해주세요`}
          num={6}
          route='/allowance/send/complete'
          onComplete={() =>
            onComplete({
              image: files[0],
              data: {
                to_id: selectedMemberData.member_id,
                amount: parseFloat(amount),
                message: message,
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default EnterPasscode;

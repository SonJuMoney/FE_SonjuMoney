import Header from '@/components/atoms/Headers/Header';
import PasswordForm from '@/components/molecules/Forms/PasswordForm';
import { useAllowanceApi } from '@/hooks/useAllowanceApi/useAllowanceApi';
import { useSavingApi } from '@/hooks/useSavingApi/useSavingApi';
import useSendSavingStore from '@/store/useSendSavingStore';
import { TSavings } from '@/types/Account';
import { TSavingList } from '@/types/Saving';

const CheckPinPage = () => {
  const { selectedSaving, amount, message } = useSendSavingStore();

  const { sendSaving } = useSavingApi();

  const onComplete = async () => {
    if (selectedSaving) {
      return await sendSaving(selectedSaving, Number(amount), message);
    } else {
      return false;
    }
  };

  return (
    <div className='pageLayout'>
      <Header title='비밀번호 확인' />

      <div className='defaultLayout'>
        <PasswordForm
          type='Passcode'
          text={`간편 비밀번호를 
  입력해주세요`}
          num={6}
          route='/savings/send/complete'
          onComplete={onComplete}
        />
      </div>
    </div>
  );
};

export default CheckPinPage;

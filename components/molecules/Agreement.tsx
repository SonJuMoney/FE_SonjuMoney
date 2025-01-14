import ArrowRight from '@/public/Icons/arrowRight_16.svg';
import CheckBox from '../atoms/CheckBoxes/CheckBox';

type AgreementProps = {
  text: string;
  required?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Agreement = ({
  text,
  required = false,
  checked,
  onChange,
}: AgreementProps) => {
  return (
    <div className='flex items-center justify-between py-2'>
      <div className='flex items-center gap-3'>
        <CheckBox checked={checked} onChange={onChange} />
        <span className='text-sm font-semibold'>
          {required && <span className='text-appColor'>[필수]</span>} {text}
        </span>
      </div>

      <ArrowRight />
    </div>
  );
};

// 약관 동의
// const termsAgreement = () => {
//   const [term1, setTerm1] = useState(false);
//   const [term2, setTerm2] = useState(false);
//   const allChecked = term1 && term2;

//   const handleAllChecked = (checked: boolean) => {
//     setTerm1(checked);
//     setTerm2(checked);
//   };

//   return (
//     <div>
//       <Agreement
//         text='전체 동의'
//         checked={allChecked}
//         onChange={handleAllChecked}
//       />

//       <Agreement
//         text='법정 대리인 인증 자동화 서비스 이용 동의'
//         required
//         checked={term1}
//         onChange={setTerm1}
//       />

//       <Agreement
//         text='마케팅 정보 수신 동의'
//         required
//         checked={term2}
//         onChange={setTerm2}
//       />

//       <ButtonLarge text='동의하고 다음' disabled={!allChecked} />
//     </div>
//   );
// };

export default Agreement;

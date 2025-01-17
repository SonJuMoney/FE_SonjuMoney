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

export default Agreement;

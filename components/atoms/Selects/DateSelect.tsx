import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useSavingsAccountStore from '@/store/useSavingsAccountStore';

const DateSelect = () => {
  const { selectedDate, setSelectedDate } = useSavingsAccountStore();

  const daysOfMonth = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const handleChange = (value: string) => {
    setSelectedDate(value);
  };

  return (
    <Select value={selectedDate} onValueChange={handleChange}>
      <SelectTrigger
        className={`w-[120px] font-pretendard text-[14px] ring-0 focus:ring-0 focus-visible:ring-0 data-[placeholder]:text-placeHolder ${
          selectedDate
            ? 'text-appColor border-appColor'
            : 'border border-disabled '
        }`}
      >
        <SelectValue placeholder='날짜 선택' />
      </SelectTrigger>
      <SelectContent className='min-w-0 w-[120px] max-h-[100px] overflow-y-auto'>
        {daysOfMonth.map((day) => (
          <SelectItem
            key={day}
            value={day}
            className='data-[state=checked]:text-appColor focus:bg-orange-50 focus:text-appColor'
          >
            매월 {day}일
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DateSelect;

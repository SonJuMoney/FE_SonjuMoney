import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TTransaction } from '@/types/Saving';

const TransactionCard = ({
  transactions,
}: {
  transactions: TTransaction[];
}) => {
  return (
    <>
      {transactions.map((transaction) => (
        <div key={transaction.after_balance}>
          <div className='w-full flex justify-between mt-2'>
            <div className='flex flex-col justify-center pl-2 space-y-1 font-medium'>
              <div className='text-appColor text-[15px]'>
                {transaction.user_name}
              </div>
              <div className='text-darkGray text-[11px]'>
                {transaction.created_at.split('T')[1].slice(0, 5)}
              </div>
            </div>
            <div className='text-appColor text-[15px]'>{`${transaction.amount.toLocaleString()}원`}</div>
          </div>
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='text-placeHolder'>
                메세지 보기
              </AccordionTrigger>
              <AccordionContent>{transaction.message}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </>
  );
};

export default TransactionCard;

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TTransaction } from '@/types/Saving';
import Image from 'next/image';

const TransactionCard = ({
  transactions,
}: {
  transactions: TTransaction[];
}) => {
  // const transactions = [
  //   {
  //     user_name: '홍길동',
  //     profile_link: null,
  //     created_at: '2025-01-21T10:10:23',
  //     message: 'message1111',
  //     amount: 50000,
  //     after_balance: 406000,
  //   },
  //   {
  //     user_name: '홍길동',
  //     profile_link: null,
  //     created_at: '2025-01-21T10:10:23',
  //     message: 'message22222',
  //     amount: 50000,
  //     after_balance: 456000,
  //   },
  // ];

  return (
    <>
      {transactions.map((transaction) => (
        <div key={transaction.after_balance}>
          <div className='w-full flex justify-between'>
            <div className='flex space-x-2 items-center'>
              <Image
                src={transaction.profile_link ?? '/Role1.png'}
                alt={transaction.user_name}
                width={40}
                height={40}
                className='object-cover rounded-full '
              />
              <div className='flex flex-col justify-center space-y-1 font-medium'>
                <div className='text-appColor text-[15px]'>
                  {transaction.user_name}
                </div>
                <div className='text-darkGray text-[11px]'>
                  {transaction.created_at.split('T')[1].slice(0, 5)}
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center items-end space-y-1 font-medium'>
              <div className='text-appColor text-[15px]'>{`${transaction.amount.toLocaleString()}원`}</div>
              <div className='text-darkGray text-[11px]'>{`${transaction.after_balance.toLocaleString()}원`}</div>
            </div>
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

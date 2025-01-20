import Image from 'next/image';
import Link from 'next/link';
import { Card } from '../atoms/Cards/Card';
import { Button } from '../ui/button';

interface PermissionCardProps {
  title: string;
  iconUrl?: string;
}

const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    <section className='flex-center h-screen w-full'>
      <Card className='w-full max-w-[520px] border-none bg-dark-1 p-6 py-9 text-white'>
        <div>
          <div className='flex flex-col gap-9'>
            <div className='flex flex-col gap-3.5'>
              {iconUrl && (
                <div className='flex-center'>
                  <Image src={iconUrl} width={72} height={72} alt='icon' />
                </div>
              )}
              <p className='text-center text-xl font-semibold'>{title}</p>
            </div>

            <Button asChild className='bg-blue-1'>
              <Link href='/'>Back to Home</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Alert;

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAlarmApi } from '@/hooks/useAlarmApi/useAlarmApi';
import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import { TAlarm } from '@/types/Alarm';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getAlarmRoute } from '@/lib/alarm';
import { formatUpdatedAt, getAlarmImage } from '@/lib/utils';

type AlarmProps = {
  data: TAlarm;
};

const Alarm = ({ data }: AlarmProps) => {
  const { readAlarm } = useAlarmApi();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { setSelectedFamily, familyList } = useSelectedFamilyStore();
  const { acceptInvitation } = useFamilyApi();

  const router = useRouter();
  const { toast } = useToast();

  const onReadAlarm = (alarm_id: number, link_id: number) => {
    if (data.family_id) {
      setSelectedFamily(
        familyList.filter((family) => family.family_id === data.family_id)[0]
      );
    }
    if (data.status === 'CHECKED') {
      toast({ title: '이미 확인한 알림입니다.' });
    } else {
      readAlarm(alarm_id);
      setIsDialogOpen(false);
      if (data.alarm_type !== 'INVITE') {
        router.push(getAlarmRoute(data.alarm_type, link_id));
      }
    }
  };

  const handleAccept = () => {
    acceptInvitation(data.link_id);
    onReadAlarm(data.alarm_id, data.link_id);
  };

  const handleReject = () => {
    onReadAlarm(data.alarm_id, data.link_id);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div
          className={`flex gap-4 items-center border-b-[1px] border-disabled px-5 py-4 bg-white ${data.status === 'CHECKED' && 'opacity-25'}`}
          onClick={() => {
            if (data.alarm_type === 'INVITE') {
              setIsDialogOpen(true);
            } else {
              onReadAlarm(data.alarm_id, data.link_id);
            }
          }}
        >
          <Image
            src={getAlarmImage(data.alarm_type)}
            width={55}
            height={55}
            alt='Alarm Icon'
          />
          <div className='flex flex-col gap-2 justify-between'>
            <span className='text-[15px] font-semibold'>{data.message}</span>
            <span className='text-placeHolder'>
              {formatUpdatedAt(data.created_at)}
            </span>
          </div>
        </div>
      </DialogTrigger>
      {data.alarm_type === 'INVITE' && data.status === 'RECEIVED' && (
        <DialogContent className='flex flex-col items-center w-4/5 rounded-xl gap-10'>
          <DialogHeader>
            <DialogTitle>가족 초대가 도착했어요</DialogTitle>
            <DialogDescription>초대를 수락하시겠습니까?</DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex justify-around flex-row gap-3 w-full'>
            <Button onClick={handleReject} className='w-full bg-disabled'>
              거절
            </Button>
            <Button onClick={handleAccept} className='w-full '>
              수락
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default Alarm;

'use client';

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
import { useAlarmApi } from '@/hooks/useAlarmApi/useAlarmApi';
import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import { useNotification } from '@/providers/NotificationProvider';
import ArrowRight from '@/public/Icons/arrowRight_20.svg';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import type { TAlarm } from '@/types/Alarm';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAlarmMessage, getAlarmRoute } from '@/lib/alarm';
import { getAlarmImage } from '@/lib/utils';

const AlarmCard = ({ data }: { data: TAlarm }) => {
  const { readAlarm } = useAlarmApi();
  const { removeNotification } = useNotification();
  const { setSelectedFamily, familyList } = useSelectedFamilyStore();
  const { getFamilies, acceptInvitation } = useFamilyApi();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchFamilies = async () => {
      const response = await getFamilies();
      if (response.length > 0) {
        setSelectedFamily(response[0]);
      }
    };
    fetchFamilies();
  }, []);

  const onReadAlarm = (alarm_id: number, link_id: number) => {
    if (data.family_id) {
      setSelectedFamily(
        familyList.filter((family) => family.family_id === data.family_id)[0]
      );
    }
    removeNotification(alarm_id);
    readAlarm(alarm_id);
    setIsDialogOpen(false);
    console.log(isDialogOpen);
    if (data.alarm_type !== 'INVITE') {
      router.push(getAlarmRoute(data.alarm_type, link_id));
    }
  };

  const handleAccept = () => {
    acceptInvitation(data.link_id);
    onReadAlarm(data.alarm_id, data.link_id);
    // router.refresh();
    // console.log(refresh);
  };

  const handleReject = () => {
    onReadAlarm(data.alarm_id, data.link_id);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div
          className='flex justify-between items-center w-full text-white rounded-[16px] p-5 bg-appColor border-2 border-white animate-pulse cursor-pointer'
          onClick={() => {
            if (data.alarm_type === 'INVITE') {
              setIsDialogOpen(true);
            } else {
              onReadAlarm(data.alarm_id, data.link_id);
            }
          }}
        >
          <div className='flex justify-between items-center gap-5 max-w-[280px] whitespace-pre-wrap'>
            <Image
              src={data.alarm_type ? getAlarmImage(data.alarm_type) : ''}
              width={45}
              height={45}
              alt='Alarm Image'
              unoptimized={true}
            />
            <span className='font-semibold text-[17px]'>
              {getAlarmMessage(data.alarm_type)}
            </span>
          </div>
          <ArrowRight />
        </div>
      </DialogTrigger>
      {data.alarm_type === 'INVITE' && (
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

export default AlarmCard;

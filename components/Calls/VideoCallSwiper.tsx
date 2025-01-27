'use client';

// Import Swiper styles
import CreateMeeting from '@/app/(routes)/call/CreateMeeting';
import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import { TMember } from '@/types/Family';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { getProfileImage } from '@/lib/utils';
import EmptyState from '../molecules/EmptyState/EmptyState';

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
}

export default function VideoCallSwiper() {
  const { selectedFamily } = useSelectedFamilyStore();
  const { getFamilyMembers } = useFamilyApi();
  const [familyMembers, setFamilyMembers] = useState<TMember[]>([]);
  useEffect(() => {
    const fetchMembers = async () => {
      if (selectedFamily) {
        const response = await getFamilyMembers(
          selectedFamily?.family_id,
          'EXCEPTME'
        );
        setFamilyMembers(response.members);
      }
    };

    fetchMembers();
  }, [selectedFamily]);

  return (
    <div className='flex flex-col items-center w-ful h-full p-4 mt-20'>
      {selectedFamily ? (
        <>
          {familyMembers.length > 0 ? (
            <div className='w-[300px] h-[400px]'>
              <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className='w-full h-full'
                cardsEffect={{
                  rotate: true,
                  perSlideOffset: 8,
                  perSlideRotate: 2,
                  slideShadows: false,
                }}
              >
                {familyMembers.map((member) => (
                  <SwiperSlide
                    key={member.member_id}
                    className='bg-white/60 rounded-[15px] border-2 border-white backdrop-blur-xl'
                  >
                    <div className='flex flex-col items-center justify-between h-full p-6'>
                      <div className='relative w-60 h-60'>
                        <Image
                          src={
                            member.profile_link
                              ? member.profile_link
                              : getProfileImage(member.member_role) || ''
                          }
                          alt={''}
                          fill
                          className='rounded-full object-cover border border-appColor bg-secondary/20 p-5'
                        />
                      </div>
                      <h3 className='text-xl font-bold mt-4'>
                        {member.member_name}
                      </h3>
                      <CreateMeeting calleeId={member.user_id.toString()} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <EmptyState
              title='아직 가족 구성원이 초대를 받지 않았어요'
              subtitle={`초대를 수락할 때 까지
조금만 기다려 주세요!`}
              href='/home'
              buttonText='홈으로 가기'
            />
          )}
        </>
      ) : (
        <EmptyState
          title='아직 소속된 가족이 없어요'
          subtitle={`가족을 생성하고
소식을 주고 받아보세요!`}
        />
      )}
    </div>
  );
}

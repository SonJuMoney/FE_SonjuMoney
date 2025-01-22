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
  }, []);
  const swiperRef = useRef(null);

  return (
    <div className='flex flex-col items-center w-ful h-full p-4 mt-20'>
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
          {familyMembers.map((user) => (
            <SwiperSlide
              key={user.member_id}
              className='bg-white/60 rounded-[15px] border-2 border-white backdrop-blur-xl'
            >
              <div className='flex flex-col items-center justify-between h-full p-6'>
                <div className='relative w-60 h-60'>
                  <Image
                    src={user.profile_link || '/Role1.png'}
                    alt={''}
                    fill
                    className='rounded-full object-cover border bg-secondary p-5'
                  />
                </div>
                <h3 className='text-xl font-bold mt-4'>{user.member_name}</h3>
                <CreateMeeting calleeId={user.user_id.toString()} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

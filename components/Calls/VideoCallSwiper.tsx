'use client';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { ButtonMedium } from '../atoms/Buttons/ButtonMedium';
import { ButtonSmall } from '../atoms/Buttons/ButtonSmall';

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
}

const mockUsers: User[] = [
  { id: '1', name: '김민수', avatar: '/avatars/user1.jpg', status: 'online' },
  { id: '2', name: '이지은', avatar: '/avatars/user2.jpg', status: 'offline' },
  { id: '4', name: '박준호', avatar: '/avatars/user3.jpg', status: 'online' },
  { id: '5', name: '박준호', avatar: '/avatars/user3.jpg', status: 'online' },
  { id: '6', name: '박준호', avatar: '/avatars/user3.jpg', status: 'online' },
];

export default function VideoCallSwiper() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const swiperRef = useRef(null);

  const handleCallUser = (user: User) => {
    setSelectedUser(user);
    // Implement your video call logic here
  };

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
          {mockUsers.map((user) => (
            <SwiperSlide
              key={user.id}
              className='bg-white/60 rounded-[15px] border-2 border-white backdrop-blur-xl'
            >
              <div className='flex flex-col items-center justify-between h-full p-6'>
                <div className='relative w-40 h-40'>
                  <Image
                    src={'/Role1.png'}
                    alt={''}
                    fill
                    className='rounded-full object-cover border bg-secondary p-5'
                  />
                  <div
                    className={`absolute bottom-4 right-4 w-4 h-4 rounded-full ${
                      user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
                <h3 className='text-xl font-bold mt-4'>{user.name}</h3>
                <ButtonSmall
                  onClick={() => handleCallUser(user)}
                  text='화상통화 걸기'
                  active={true}
                  className='bg-white'
                ></ButtonSmall>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

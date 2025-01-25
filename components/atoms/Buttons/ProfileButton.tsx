'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useAuthApi } from '@/hooks/useAuthApi/useAuthApi';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import { TAuth } from '@/types/user';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getChildProfileImage, getParentProfileImage } from '@/lib/utils';

export default function ProfileButton() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const { setSelectedFamily } = useSelectedFamilyStore();
  const { getAuthList, switchAccount } = useAuthApi();
  const [authList, setAuthList] = useState<TAuth[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleMouseDown = () => {
    const timer = setTimeout(() => {
      if (authList.length > 1) setIsDrawerOpen(true);
      setLongPressTimer(null);
    }, 500);

    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
      setIsModalOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleSignOut = async () => {
    setSelectedFamily(null);
    await signOut({
      redirect: true,
      callbackUrl: '/login',
    });
  };

  const getProfileImage = (
    role: 'PARENT' | 'CHILD' | 'INDIVIDUAL',
    gender: 'FEMALE' | 'MALE'
  ) => {
    if (role === 'CHILD') return getChildProfileImage(gender);
    else return getParentProfileImage(gender);
  };

  useEffect(() => {
    const fetchAuthList = async () => {
      const response = await getAuthList();
      console.log(response);
      setAuthList(response);
    };

    fetchAuthList();
  }, []);

  const switchSession = async (userId: string) => {
    const response = await switchAccount(userId);

    await update(response);
    setIsDrawerOpen(false);
    router.push('/home');
  };

  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <Image
          src={session?.user?.userProfile ?? '/Role1.png'}
          alt='profile'
          width={24}
          height={24}
          className='rounded-full border bg-white'
        />
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='w-1/2 rounded-lg'>
          <button className='focus:text-appColor'>프로필 사진 변경</button>
          <button onClick={handleSignOut} className='focus:text-appColor'>
            로그아웃
          </button>
        </DialogContent>
      </Dialog>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <div className='py-4 px-6 flex flex-col gap-4 w-full'>
            <h2 className='text-center'>계정 변경</h2>
            {authList.map((auth) => (
              <div
                key={auth.user_id}
                className='flex justify-between items-center'
              >
                <div className='flex gap-4 items-center'>
                  <Image
                    width={30}
                    height={30}
                    src={
                      auth.profile ?? getProfileImage(auth.role, auth.gender)
                    }
                    alt='authProfile'
                    className='border rounded-full'
                  />
                  <div
                    className={`${auth.user_id === session?.user?.userId ? 'text-appColor' : ''}`}
                  >
                    {auth.name}
                  </div>
                </div>
                {session?.user?.userId !== auth.user_id && (
                  <button
                    className='text-xs text-blue-500'
                    onClick={() => switchSession(auth.user_id)}
                  >
                    변경
                  </button>
                )}
              </div>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

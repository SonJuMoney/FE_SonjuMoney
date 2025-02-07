'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { useAuthApi } from '@/hooks/useAuthApi/useAuthApi';
import { useUserApi } from '@/hooks/useUserApi/useUserApi';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import { TAuth } from '@/types/user';
import { signOut, useSession } from 'next-auth/react';
import { FaUser } from 'react-icons/fa';
import { MdCameraAlt } from 'react-icons/md';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getChildProfileImage, getParentProfileImage } from '@/lib/utils';

export default function ProfileButton() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const { setSelectedFamily } = useSelectedFamilyStore();
  const { getAuthList, switchAccount } = useAuthApi();
  const { patchProfile } = useUserApi();
  const [authList, setAuthList] = useState<TAuth[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [imageKey, setImageKey] = useState(Date.now());

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
      setAuthList(response);
    };

    fetchAuthList();
  }, []);

  const changeProfile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      const response = await patchProfile(formData);

      await update({
        user_profile: response, // 서버에서 받은 이미지 URL
        user_id: session?.user?.userId,
        user_name: session?.user?.userName,
        gender: session?.user?.userGender,
        birth: session?.user?.userBirth,
        access_token: session?.user?.accessToken,
        refresh_token: session?.user?.refreshToken,
      });

      setImageKey(Date.now());
    };

    input.click();
  };

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
        {session?.user?.userProfile ? (
          <Image
            src={session?.user?.userProfile}
            alt='profile'
            width={30}
            height={30}
            className='rounded-full border border-appColor overflow-hidden object-cover w-[30px] h-[30px] aspect-square'
          />
        ) : (
          <div
            className={`h-[30px] w-[30px] flex items-center justify-center border-1 rounded-full bg-appColor text-white text-xl`}
          >
            <FaUser />
          </div>
        )}
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='w-2/3 rounded-lg'>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <div className='flex flex-col gap-5 justify-between items-center'>
            <div className='relative w-[150px] h-[150px] rounded-full border flex justify-center items-center flex-grow-0'>
              {session?.user?.userProfile ? (
                <Image
                  width={150}
                  height={150}
                  src={`${session.user.userProfile}?v=${imageKey}`}
                  alt='userImage'
                  className='rounded-full object-cover w-full h-full'
                />
              ) : (
                <div
                  className={`h-[150px] w-[150px] flex items-center justify-center border-1 rounded-full bg-appColor text-white text-[90px]`}
                >
                  <FaUser width={150} height={150} />
                </div>
              )}

              <div
                onClick={changeProfile}
                className='absolute bottom-0 right-0 w-10 h-10 border rounded-full bg-white flex justify-center items-center'
              >
                <MdCameraAlt className='w-7 h-7 text-gray-500' />
              </div>
            </div>
            <div className='font-semibold text-[20px]'>
              {session?.user?.userName}
            </div>
            <button
              onClick={handleSignOut}
              className='w-full p-3 text-white bg-appColor rounded-lg'
            >
              로그아웃
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTitle></DrawerTitle>
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

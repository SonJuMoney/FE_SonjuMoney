'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CallControls,
  CallParticipantsList,
  ParticipantView,
  CallingState,
  LoadingIndicator,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { Users, LayoutList } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import EndCallButton from './EndCallButton';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState, useParticipants } = useCallStateHooks();

  const participants = useParticipants();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <LoadingIndicator />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition='left' />;
      default:
        return <SpeakerLayout participantsBarPosition='right' />;
    }
  };

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      {participants[1] && (
        <div className='h-full w-full'>
          <ParticipantView
            participant={participants[1]}
            className='h-full w-full object-cover'
          />
        </div>
      )}
      <div className='absolute top-14 right-4 h-[180px] w-[120px] overflow-hidden  border-2 border-white shadow-lg'>
        <ParticipantView
          participant={participants[0]}
          className='h-full w-full object-cover'
        />
      </div>
      {/* video layout and call controls */}
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5p-4 overflow-x-scroll flex-wrap p-4'>
        <CallControls onLeave={() => router.push(`/`)} />

        <DropdownMenu>
          <div className='flex items-center'>
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  '>
              <LayoutList size={20} className='text-white' />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-dark-1' />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <CallStatsButton /> */}
        {/* <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className=' cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  '>
            <Users size={20} className='text-white' />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />} */}
      </div>
    </section>
  );
};

export default MeetingRoom;

'use client';

import { useCallApi } from '@/hooks/useCallApi/useCallApi';
import { Recommendation } from '@/types/Calls';
import { useCallStateHooks } from '@stream-io/video-react-sdk';
import { Sparkles } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Skeleton } from '../ui/skeleton';

const TopicTicker = () => {
  const { data: session } = useSession();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [topics, setTopics] = useState<Recommendation[]>([]);
  const { getRecommendations } = useCallApi();
  const hasCalledApi = useRef(false);

  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  const otherUser = participants.find(
    (p) => p.userId !== session?.user?.userId?.toString()
  );

  const fetchRecommendations = useCallback(async () => {
    if (!otherUser?.userId || hasCalledApi.current) return;
    hasCalledApi.current = true;
    const response = await getRecommendations(Number(otherUser.userId));
    setTopics(response);
  }, [otherUser?.userId, getRecommendations]);

  useEffect(() => {
    if (otherUser?.userId) {
      fetchRecommendations();
    }
  }, [otherUser, fetchRecommendations]);

  useEffect(() => {
    if (topics.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topics.length);
        setIsTransitioning(false);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, [topics.length]);

  if (!topics.length) return <Skeleton className='w-4/5 h-[30px]' />;

  return (
    <div className='w-full bg-gradient-to-r from-purple-500 to-pink-500 p-2'>
      <div className='max-w-4xl mx-auto flex items-center justify-center relative'>
        <Sparkles className='text-yellow-300 mr-3 flex-shrink-0' />
        <span className='text-white font-semibold mr-3 flex-shrink-0 text-lg'>
          AI 추천 주제:
        </span>
        <div className='flex-1 min-h-[60px] flex items-center overflow-hidden'>
          <div
            className={`w-full transition-all duration-500 ease-in-out ${
              isTransitioning
                ? 'opacity-0 transform -translate-y-2'
                : 'opacity-100 transform translate-y-0'
            }`}
          >
            <p className='text-white text-lg leading-tight'>
              {topics[currentIndex].topic}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicTicker;

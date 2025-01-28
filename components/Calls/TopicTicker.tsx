'use client';

import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const topics = [
  { topic: '고양이가 좋아? 강아지가 좋아?' },
  { topic: '엄마가 좋아? 아빠가 좋아?' },
  { topic: '어른이 되면 뭘 하고 싶어?' },
  { topic: '초능력자가 된다면 어떤 초능력을 갖고 싶어?' },
  { topic: 'DeepSeek의 출현에 따른 AI 산업의 미래를 어떻게 전망하니?' },
];

const TopicTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topics.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

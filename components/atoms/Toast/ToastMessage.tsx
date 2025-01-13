import { useState, useEffect } from 'react';

type Props = {
  message: string;
};

const Toast = ({ message }: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className='fixed bottom-4 left-1/2 -translate-x-1/2 bg-appColor text-white px-4 py-2 rounded-full shadow-lg'>
      {message}
    </div>
  );
};

export default Toast;

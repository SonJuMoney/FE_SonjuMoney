'use client';

import { useEffect } from 'react';

export const useScrollLock = (isOpen: boolean) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = originalStyle;
      document.body.style.position = 'static';
    }

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.position = 'static';
    };
  }, [isOpen]);
};

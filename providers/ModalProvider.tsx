"use client";
import React, { useEffect, useState } from 'react';

import AuthModal from '@/components/AuthModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted((prev) => true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
    </>
  )
}

export default ModalProvider;
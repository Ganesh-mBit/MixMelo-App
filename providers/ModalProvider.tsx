"use client";
import React, { useEffect, useState } from 'react';

import Modal from '@/components/Modal';

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
      <Modal
        title='Modal'
        description='lorem'
        isOpen
        onChange={() => { }}
      >
        Test Children
      </Modal>
    </>
  )
}

export default ModalProvider;
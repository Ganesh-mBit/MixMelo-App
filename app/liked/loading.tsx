"use client";
import React from 'react'

import Box from '@/components/Box';
import { ScaleLoader } from 'react-spinners';

const Loading = () => {
  return (
    <Box className="h-full flex justify-center items-center">
      <ScaleLoader color="#22c55e" />
    </Box>
  )
}

export default Loading;
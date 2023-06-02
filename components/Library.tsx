import React from 'react';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

const Library = () => {
  const handleClick = () => {
    // Handle upload Function
  }
  return (
    <div className='flex flex-col'>
      <div className='flex justify-between items-center px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist className='text-neutral-400' size={24} />
          <p className='font-medium text-neutral-400 text-md'>Your Library</p>
        </div>
        <AiOutlinePlus onClick={handleClick} size={20} className='text-neutral-400 cursor-pointer hover:text-white ' />
      </div>
      <div className='flex flex-col px-3 mt-2 gap-y-2 '>
        List Of songs
      </div>
    </div>
  )
}

export default Library;
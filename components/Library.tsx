import React from 'react';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

import useAuthMOdal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useUploadMoad from '@/hooks/useUploadModal';
import MediaItem from './MediaItem';
import { Song } from '@/types';
import useOnPlay from '@/hooks/useOnPlay';

interface LibraryProps {
  songs: Song[]
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const { user } = useUser();
  const authModal = useAuthMOdal();
  const uploadModal = useUploadMoad();
  const onPlay = useOnPlay(songs);

  const handleClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    //Todo Check for subscription

    return uploadModal.onOpen();
    // Handle upload Function
  };

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
        {songs.map((item) => (
          <MediaItem
            key={item.id}
            data={item}
            onClick={(id: string) => onPlay(id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Library;
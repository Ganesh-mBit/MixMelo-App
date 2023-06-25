import React from 'react';

import Header from '@/components/Header';
import getLikedSongs from '@/actions/getLikedSongs';
import Image from 'next/image';
import LikedContent from './components/LikedContent';

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();

  return (
    <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative w-32 h-32">
              <Image
                fill
                src="/images/liked.png"
                alt='Playlist'
                className="object-cover"
              />
            </div>
            <div className="flex flex-col mt-4 gap-y-2 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1 className="text-white text-4xl sm:text-5xl font-bold">Liked songs</h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  )
}

export default Liked;
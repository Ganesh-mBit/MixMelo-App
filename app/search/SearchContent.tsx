"use client";
import React from 'react';

import { Song } from '@/types';
import useOnPlay from '@/hooks/useOnPlay';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);


  if (songs.length === 0) {
    return (
      <div className="flex w-full flex-col px-6 gap-y-2 text-neutral-400">
        No songs found.
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col px-6 gap-y-2">
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex items-center w-full gap-x-4"
        >
          <div className="flex-1">
            <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}

export default SearchContent;
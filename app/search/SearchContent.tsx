"use client";
import MediaItem from '@/components/MediaItem';
import { Song } from '@/types';
import React from 'react';

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
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
              <MediaItem data={song} onClick={() => { }} />
            </div>
          </div>
        ))}
    </div>
  )
}

export default SearchContent;
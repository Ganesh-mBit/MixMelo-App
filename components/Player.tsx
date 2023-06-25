"use client";
import React from 'react';

import usePlayer from '@/hooks/usePlayer';
import useGetSongById from '@/hooks/useGetSongById';
import useSongLoadUrl from '@/hooks/useSongLoadUrl';
import PlayerContent from './PlayerContent';

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useSongLoadUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="w-full fixed bg-black bottom-0 py-2 h-[80px] px-4">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}

export default Player;
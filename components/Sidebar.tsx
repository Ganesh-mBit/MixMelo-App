"use client";
import React, { useMemo } from 'react';
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { usePathname } from 'next/navigation';

import Box from './Box';
import { Song } from '@/types';
import Library from './Library';
import SidebarItem from './SidebarItem';
import usePlayer from '@/hooks/usePlayer';
import { twMerge } from 'tailwind-merge';

interface SidebarProps {
  songs: Song[]
  children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({ songs, children }) => {
  const pathName = usePathname();
  const player = usePlayer();

  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: 'Home',
      active: pathName !== '/search',
      href: '/',
    },
    {
      icon: BiSearch,
      label: 'Search',
      active: pathName === '/search',
      href: '/search',
    },
  ], [pathName]);

  return (
    <div className={twMerge(`flex h-full`, player.activeId && 'h-[calc(100%-80px)]')}>
      <div
        className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2 "
      >
        <Box>
          <div className="flex flex-col gap-y-6 py-5 px-4 ">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className='h-full overflow-y-auto py-2 flex-1'>
        {children}
      </main>
    </div>
  )
}

export default Sidebar;
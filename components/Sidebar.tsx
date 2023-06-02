"use client";
import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';

interface SidebarProps {
  children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathName = usePathname();

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
    <div className="flex h-full">
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
          <Library />
        </Box>
      </div>
      <main className='h-full overflow-y-auto py-2 flex-1'>
        {children}
      </main>
    </div>
  )
}

export default Sidebar;
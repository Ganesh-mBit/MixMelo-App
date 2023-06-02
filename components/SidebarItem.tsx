import React from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
  icon: IconType
  label: string
  active?: boolean
  href: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, active, href }) => {
  return (
    <Link href={href} className={twMerge(`flex flex-row items-center w-full h-auto gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-0`, active && 'text-white')}>
      <Icon size={24} />
      <p className='truncate w-100'>{label}</p>
    </Link>
  )
}

export default SidebarItem;
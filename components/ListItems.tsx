"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPlay } from 'react-icons/fa';
import React from 'react';

interface ListItemProps {
  name: string
  image: string
  href: string
}

const ListItems: React.FC<ListItemProps> = ({ name, image, href }) => {
  const router = useRouter();

  const handleNaviagte = () => {
    // Check For Authentication Before Push
    router.push(href);
  }

  return (
    <button onClick={handleNaviagte} className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
      <div className='min-w-[64px] min-h-[64px] relative'>
        <Image className='object-cover' fill src={image} alt='liked' />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute transition opacity-0 rounded-full flex justify-center items-center p-3 bg-green-500 drop-shadow-md right-5 group-hover:opacity-100 scale-110">
        <FaPlay className='text-black' />
      </div>
    </button>
  )
}

export default ListItems;
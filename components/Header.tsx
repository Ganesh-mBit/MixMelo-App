"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { useUser } from '@/hooks/useUser';
import { FaUserAlt } from 'react-icons/fa';
import useAuthMOdal from '@/hooks/useAuthModal';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import Button from './Button';
interface HeaderProps {
  children: React.ReactNode
  className?: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const { onOpen } = useAuthMOdal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //TODO Reset any Playing songs
    router.refresh();

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
      <div className='w-full flex justify-between items-center mb-4'>
        <div className='hidden md:flex gap-x-2 items-center '>
          <button onClick={() => router.back()} className='rounded-full flex bg-black justify-center items-center hover:opacity-75 transition p-1'>
            <RxCaretLeft className='text-white' size={34} />
          </button>
          <button onClick={() => router.forward()} className='rounded-full flex bg-black justify-center items-center hover:opacity-75 transition p-1'>
            <RxCaretRight className='text-white' size={34} />
          </button>
        </div>
        <div className='flex md:hidden gap-x-2 items-center'>
          <button className='rounded-full flex p-2 justify-center items-start bg-white hover:opacity-75 transition'>
            <HiHome className='text-black' size={20} />
          </button>
          <button className='rounded-full flex p-2 justify-center items-start bg-white hover:opacity-75 transition'>
            <BiSearch className='text-black' size={20} />
          </button>
        </div>
        <div className='flex justify-between items-center gap-x-4'>
          {user ? (
            <div className='flex gap-x-4 items-center'>
              <Button onClick={handleLogout} className='bg-white px-6 py-2'>
                Logout
              </Button>
              <Button onClick={()=> router.push('/account')} className='bg-white p-3'>
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button onClick={onOpen} className='bg-transparent text-neutral-300 font-medium'>
                  Sign In
                </Button>
              </div>
              <div>
                <Button onClick={onOpen} className='bg-white py-2 px-6'>
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header;
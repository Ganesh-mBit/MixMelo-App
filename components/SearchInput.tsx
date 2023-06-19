"use client";
import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { useRouter } from 'next/navigation';

import Input from './Input';
import useDebounce from '@/hooks/useDebounce';

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');

  const debouncedValue = useDebounce<string>(value, 700);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/search',
      query: query
    });

    router.push(url);
  }, [debouncedValue, router])


  return (
    <Input placeholder='What do you want to listen' value={value} onChange={(e) => setValue(e.target.value)} />
  )
}

export default SearchInput;
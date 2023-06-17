import getSongsByTitle from '@/actions/getSongsByTitle';
import Header from '@/components/Header';
import React from 'react';

interface SearchProps {
  searchParams: {
    title: string;
  }
}

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className="bg-neutral-900 w-full h-full rounded-lg overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="flex flex-col mb-2 gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
        </div>
      </Header>
    </div>
  )
}

export default Search;
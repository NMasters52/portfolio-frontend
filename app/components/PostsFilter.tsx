import React from 'react'

type PostsFilterProps = {
    searchQuery: string;
    onQueryChange: (value:string) => void;
}

const PostsFilter = ({searchQuery, onQueryChange}: PostsFilterProps) => {
  return (
    <div className='mb-6'>
        <input 
            type='text' 
            className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Search Posts...'
            onChange={(e) => onQueryChange(e.target.value)}
            value={searchQuery}
        />
    </div>
  )
}

export default PostsFilter
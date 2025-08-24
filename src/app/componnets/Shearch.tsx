'use client'
import { Bell, Search as SearchIcon, User, Settings, LogOut } from 'lucide-react'
import { useState } from 'react'

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('')
    return (
       <div className='hidden md:flex flex-1 max-w-md'>
          <div className='relative'>
            <SearchIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type="text"
              placeholder="ابحث عن معلم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-12 pl-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            />
          </div>
        </div>
    )
}
export default Search

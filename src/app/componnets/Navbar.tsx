"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Bell, Search, User, Settings, LogOut } from 'lucide-react'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className='bg-white px-6 py-4 shadow-sm' dir='rtl'>
      <div className='flex items-center justify-between'>
        {/* Left Side - Search */}
        <div className='hidden md:flex flex-1 max-w-md'>
          <div className='relative'>
            <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type="text"
              placeholder="ابحث هنا..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-12 pl-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            />
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className='flex items-center gap-4 '>
          {/* Notifications */}
          <div className=' cursor-pointer p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group' >
            <Image src='/message.png' alt="رسائل" width={20} height={20} />
          </div>
          <button className='relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group'>
            <Bell className='w-6 h-6' />
            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>3</span>
          </button>

          {/* User Profile */}
          <div className='flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-all duration-200 cursor-pointer group'>
            <div className='hidden lg:block text-right'>
              <p className='text-sm font-semibold text-gray-800'>أحمد محمد</p>
              <p className='text-xs text-gray-500'>مدير النظام</p>
            </div>
            <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'>
              <User className='w-5 h-5 text-white' />
            </div>
          </div>

          {/* Quick Actions */}
          <div className='flex items-center gap-2'>
            <button className='p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200'>
              <Settings className='w-5 h-5' />
            </button>
            <button className='p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200'>
              <LogOut className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
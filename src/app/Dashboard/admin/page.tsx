import React from 'react'
import UserCard from '../../componnets/UserCard'
import CountCharts from '@/app/componnets/CountChart'
import Attendance from '../../componnets/Attendance'
import FinanceChart from '../../componnets/FinanceChart'
import EventCalender from '../../componnets/EventCalender'
import Announcements from '../../componnets/Announcements'


const AdminPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col lg:flex-row' dir='rtl'>
      {/* right */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        {/* UserCards */}
        <div className='flex gap-4 justify-between flex-wrap'>
          <UserCard type="طالب" />
          <UserCard type="مدرس" />
          <UserCard type="ولي امر" />
          <UserCard type="طاقم عمل" />
        </div>
        
        {/* MIDDLE CHARTS */}
        <div className='flex gap-4 flex-col lg:flex-row'>
          {/* CountChart */}
          <div className='w-full lg:w-1/3 h-[450px]'>
            <CountCharts />
          </div>
          {/* Attendance Charts */}
          <div className='w-full lg:w-2/3 h-[450px]'>
            <Attendance />
          </div>
        </div>
        
        {/* BOTTOM CHARTS */}
        <div className=''>
          <FinanceChart />
        </div>
      </div>
      
      {/* left */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
      <EventCalender />
      <Announcements />
      </div>
    </div>
  )
}

export default AdminPage
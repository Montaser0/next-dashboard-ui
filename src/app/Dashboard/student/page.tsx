import React from 'react'
import EventCalender from '../../componnets/EventCalender'
import Announcements from '../../componnets/Announcements'
import BigCalendar from '../../componnets/BigCalendar'

const page = () => {
  return (
    <div className="p-4 flex gap-4 flex-col lg:flex-row" dir='rtl'>
      {/* right */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
      <BigCalendar />
      </div>
      {/* left */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
      <EventCalender />
      <Announcements />
      </div>
    </div>
  )
}

export default page
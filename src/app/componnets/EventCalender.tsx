"use client"
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-calendar/dist/Calendar.css';
import Image from 'next/image';
// Render the calendar only on the client to avoid SSR/CSR text mismatches
// caused by locale/timezone differences in month names
const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
// مؤقت
const events = [
    {
        id: 1,
        title: "تم تأجيل درس الحاسوب",
        time: "12:00 PM - 2:00 PM",
        description: "استاذ الحاسوب مسافر"
    },
    {
        id: 2,
        title: "اجتماع أولياء الأمور",
        time: "10:00 AM - 11:00 AM",
        description: "اجتماع مع أولياء الأمور في قاعة الاجتماعات"
    },
    {
        id: 3,
        title: "اختبار رياضيات",
        time: "9:00 AM - 10:30 AM",
        description: "اختبار منتصف الفصل في مادة الرياضيات"
    }
]

const EventCalender = () => {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className="bg-white gap-4 p-3">
            <Calendar onChange={onChange} value={value} />
            <div className="flex items-center justify-between">
                <h1 className='font-semibold text-xl my-4'>الاحداث</h1>
                <Image src="/moreDark.png" alt=" "  width={20} height={20}/>
            </div>
            <div className="flex flex-col gap-4">
                {events.map(event =>(
                    <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-sky even:border-t-Yellow" key={event.id}>
                        <div className="flex items-center justify-between">
                            <h1 className='font-semibold text-gray-700 text-md mb-2'>{event.title}</h1>
                            <span className='text-gray-500 text-xs'>{event.time}</span>
                        </div>
                        <p className='text-gray-500'>{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default EventCalender
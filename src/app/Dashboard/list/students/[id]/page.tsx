import Announcements from '@/app/componnets/Announcements'
import BigCalendar from '@/app/componnets/BigCalendar'
import Performance from '@/app/componnets/Performance'
import Image from 'next/image'
import Link from "next/link";


const SingleTeacher = () => {
    return (
        <div className="flex-1 p-4 flex flex-col xl:flex-row" dir="rtl">
            {/* right */}
            <div className="w-full xl:w-2/3 ml-4">
                {/* Top */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* User info card */}
                    <div className="bg-white py-6 px-4 rounded-md border flex-1 flex gap-4">
                        {/* Image */}
                        <div className="w-1/3">
                            <Image
                                src="/teacher.jpg"
                                width={144}
                                height={144}
                                className="rounded-full w-36 h-36 object-cover"
                                alt="teacher"
                            />
                        </div>
                        {/* Info */}
                        <div className="w-2/3 flex flex-col justify-between gap-4">
                            <h1 className="text-2xl font-bold">
                                أحمد مصطفى                            </h1>
                            <p className='text-sm text-gray-500'>طالب في المدرسة في الصف الاول</p>
                            <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                                <div className='flex items-center gap-1 text-gray-500 gap-2'>
                                    <Image src="/blood.png" width={14} height={14} alt="blood type" />
                                    <span>o+</span>
                                </div>
                                <div className='flex items-center gap-1 text-gray-500 gap-2'>
                                    <Image src="/phone.png" width={14} height={14} alt="phone" className='' />
                                    <span>05316924944</span>
                                </div>
                                <div className='flex items-center gap-1 text-gray-500 gap-2'>
                                    <Image src="/mail.png" width={14} height={14} alt="email" />
                                    <span>montaser@example.com</span>
                                </div>
                                <div className='flex items-center gap-1 text-gray-500 gap-2'>
                                    <Image src="/date.png" width={14} height={14} alt="date" />
                                    <span>2024-01-01</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Small cards */}
                    <div className="flex-1 flex gap-4 justify-between flex-wrap">
                        {/* Card */}

                        <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
                            <Image src="/singleAttendance.png" width={24} height={24} alt="calendar" className='h-6 w-6' />

                            <div className=''>
                                <h1 className='text-xl font-semibold'>الحضور</h1>
                                <span className='text-lg text-gray-500'>95%</span>
                            </div>

                        </div>
                        <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
                            <Image src="/singleBranch.png" width={24} height={24} alt="calendar" className='h-6 w-6' />
                            <div className=''>
                                <h1 className='text-xl font-semibold'>الفروع</h1>
                                <span className='text-lg text-gray-500'>2</span>
                            </div>
                        </div>
                        <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
                            <Image src="/singleLesson.png" width={24} height={24} alt="calendar" className='h-6 w-6' />
                            <div className=''>
                                <h1 className='text-xl font-semibold'>الدروس</h1>
                                <span className='text-lg text-gray-500'>18</span>
                            </div>
                        </div>
                        <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
                            <Image src="/singleClass.png" width={24} height={24} alt="calendar" className='h-6 w-6' />
                            <div className=''>
                                <h1 className='text-xl font-semibold'>الصف</h1>
                                <span className='text-lg text-gray-500'>1</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom */}
                <div className="bg-white mt-4 p-4 rounded-md border">
                    <BigCalendar />
                    {/* Add a calendar or other content here */}
                </div>
            </div>
            {/* left */}
            <div className="w-full xl:w-1/3">

                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">الاختصارات</h1>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                        <Link className="p-3 rounded-md bg-skylight" href="/">
                            معلمي الطالب
                        </Link>
                        <Link className="p-3 rounded-md bg-purpleLight" href="/">
                    دروس الطالب
                        </Link>
                        <Link className="p-3 rounded-md bg-yellowLight" href="/">
                            امتحانات الطالب
                        </Link>
                        <Link className="p-3 rounded-md bg-pink-50" href="/">
                            واجبات الطالب
                        </Link>
                        <Link className="p-3 rounded-md bg-skylight" href="/">
                            نتائج الطالب 
                        </Link>
                    </div>
                </div>
                <Performance />
                <Announcements />
            </div>
        </div>
    )
}

export default SingleTeacher

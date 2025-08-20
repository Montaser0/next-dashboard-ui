'use client'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

const data = [
    {
        name: 'الكلي',
        count: 106,
        fill: 'white',
    },
    {
        name: 'اناث',
        count: 53,
        fill: '#fae27c',
    },
    {
        name: 'ذكور',
        count: 53,
        fill: '#c3ebfa',
    },
];

const CountCharts = () => {
    const style = {
        top: 0,
        left: 350,
        lineHeight: '24px'
    };

    return (
        <div className='bg-white rounded-xl w-full h-full p-6 flex flex-col'>
            {/* TITLE */}
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-xl font-bold text-gray-800'>الطلاب</h1>
                <div className='p-2 hover:bg-gray-200  transition-colors duration-200 cursor-pointer'>
                    <Image src="/moreDark.png" alt="More options" width={20} height={20} />
                </div>
            </div>

            {/* Chart */}
            <div className='relative flex-1 mb-4 min-h-0'>
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="80%" barSize={32} data={data}>
                        <RadialBar
                            label={{ position: 'insideStart', fill: '#fff', fontSize: '12px' }}
                            background
                            dataKey="count"
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
                <Image 
                    src="/maleFemale.png" 
                    alt='Male Female Icon' 
                    width={50} 
                    height={50} 
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' 
                />
            </div>

            {/* Bottom Statistics */}
            <div className="flex justify-center gap-16 mt-auto">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-5 h-5 bg-sky rounded-full"></div>
                    <h1 className="font-bold text-xl text-gray-800">1,234</h1>
                    <h2 className="text-xs text-gray-500">ذكور (55%)</h2>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-5 h-5 bg-Yellow rounded-full"></div>
                    <h1 className="font-bold text-xl text-gray-800">1,010</h1>
                    <h2 className="text-xs text-gray-500">إناث (45%)</h2>
                </div>
            </div>
        </div>
    )
}

export default CountCharts;
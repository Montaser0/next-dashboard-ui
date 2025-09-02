"use client"
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import Image from 'next/image';
const data = [
    { name: 'Group A', value: 92, fill: '#c3ebfa' },
    { name: 'Group B', value: 8, fill: '#fae27c' },
];

const Performance = () => {
    return (
        <div className="bg-white p-4 rounded-md w-full h-80 mb-4 border relative">
            <div className='flex justify-between items-center mb-4'>
                <h1 className=''>الاداء</h1>
                <Image src="/moreDark.png" alt="" width={16} height={16}></Image>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}

                    />
                </PieChart>
            </ResponsiveContainer>
            <div className='absolute bottom-4 left-1/2 top-1/2 -translate-x-1/2 text-center '>
                <h1 className='text-2xl font-bold'>92%</h1>
                <span className='text-gray-500'>متوسط الاداء</span>
            </div>
            <h2 className='font-medium absolute bottom-16 left-0 right-0 m-auto text-center'>الفصل الاول - الفصل الثاني </h2>
        </div>
    )
}
export default Performance;
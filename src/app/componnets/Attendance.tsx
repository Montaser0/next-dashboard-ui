'use client'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

const data = [
    {
        name: 'الأحد',
        حاضر: 90,
        غائب: 75,
    },
    {
        name: 'الاثنين',
        حاضر: 45,
        غائب: 33,
    },
    {
        name: 'الثلاثاء',
        حاضر: 78,
        غائب: 56,
    },
    {
        name: 'الأربعاء',
        حاضر: 88,
        غائب: 70,
    },
    {
        name: 'الخميس',
        حاضر: 55,
        غائب: 45,
    },
];

const Attendance = () => {
    return (
        <div className='bg-white rounded-lg p-4 h-full'>
            <div className='flex justify-between items-center mb-6'>
                <div>
                    <h1 className='text-xl font-bold text-gray-800 mb-1'>الحضور</h1>
                    <p className='text-sm text-gray-500'>إحصائيات الحضور والغياب الأسبوعية</p>
                </div>
                <div className='p-2  hover:bg-gray-200  transition-colors duration-200 cursor-pointer'>
                    <Image src='/moreDark.png' alt='More options' width={20} height={20} />
                </div>
            </div>
            
            <div className='flex-1 min-h-0'>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} barSize={20}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tick={{ fill: "#6b7280" }}
                            tickLine={false}
                        />
                        <YAxis 
                            axisLine={false} 
                            tick={{ fill: "#6b7280" }} 
                            tickLine={false} 
                        />
                        <Tooltip
                            contentStyle={{ 
                                borderRadius: "10px", 
                                borderColor: "lightgray",
                                backgroundColor: "white",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                            }}
                        />
                        <Legend
                            align="right"
                            verticalAlign="top"
                            wrapperStyle={{ paddingTop: "20px", paddingBottom: "20px" }}
                            formatter={(value, entry) => (
                                <span className="text-black font-medium m-2">{value}</span>
                            )}
                        />
                        <Bar
                            dataKey="حاضر"
                            fill="#FAE27C"
                            legendType="circle"
                            // radius={[10, 10, 0, 0]}
                            name="حاضر"
                        />
                        <Bar
                            dataKey="غائب"
                            fill="#C3EBFA"
                            legendType="circle"
                            // radius={[10, 10, 0, 0]}
                            name="غائب"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Attendance
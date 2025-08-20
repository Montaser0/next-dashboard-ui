"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "يناير",
    الايرادات: 4000,
    المصروفات: 2400,
  },
  {
    name: "فبراير",
    الايرادات: 3000,
    المصروفات: 1398,
  },
  {
    name: "مارس",
    الايرادات: 2000,
    المصروفات: 9800,
  },
  {
    name: "أبريل",
    الايرادات: 2780,
    المصروفات: 3908,
  },
  {
    name: "مايو",
    الايرادات: 1890,
    المصروفات: 4800,
  },
  {
    name: "يونيو",
    الايرادات: 2390,
    المصروفات: 3800,
  },
  {
    name: "يوليو",
    الايرادات: 3490,
    المصروفات: 4300,
  },
  {
    name: "أغسطس",
    الايرادات: 3490,
    المصروفات: 4300,
  },
  {
    name: "سبتمبر",
    الايرادات: 3490,
    المصروفات: 4300,
  },
  {
    name: "أكتوبر",
    الايرادات: 3490,
    المصروفات: 4300,
  },
  {
    name: "نوفمبر",
    الايرادات: 3490,
    المصروفات: 4300,
  },
  {
    name: "ديسمبر",
    الايرادات: 3490,
    المصروفات: 4300,
  },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-xl  w-full h-full p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-1">المالية</h1>
          <p className="text-sm text-gray-500">إحصائيات الإيرادات والمصروفات الشهرية</p>
        </div>
        <div className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 cursor-pointer">
          <Image src="/moreDark.png" alt="More options" width={20} height={20} />
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis 
              axisLine={false} 
              tick={{ fill: "#6b7280", fontSize: 12 }} 
              tickLine={false}  
              tickMargin={20}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "20px", paddingBottom: "20px" }}
              formatter={(value, entry) => (
                <span className="text-black font-medium">{value === 'income' ? 'الإيرادات' : 'المصروفات'}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="الايرادات"
              stroke="#C3EBFA"
              strokeWidth={3}
              dot={{ fill: '#C3EBFA', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#C3EBFA', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="المصروفات" 
              stroke="#FAE27C" 
              strokeWidth={3}
              dot={{ fill: '#FAE27C', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#FAE27C', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Section */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-3 h-3 bg-sky rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">إجمالي الإيرادات</span>
            </div>
            <h3 className="text-2xl font-bold text-sky">$35,420</h3>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-3 h-3 bg-Yellow rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">إجمالي المصروفات</span>
            </div>
            <h3 className="text-2xl font-bold text-Yellow">$48,794</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceChart;

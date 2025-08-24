"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { role } from '@/lib/data'

const menuItems = [
  {
    title: "القائمة الرئيسية",
    items: [
      {
        icon: "/home.png",
        label: "الرئيسية",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "ادمن",
        href: "/Dashboard/admin",
        visible: ["admin"],
      },
      {
        icon: "/teacher.png",
        label: "المعلمين",
        href: "/Dashboard/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "الطلاب",
        href: "/Dashboard/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "اولياء الامور",
        href: "/Dashboard/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "المواضيع",
        href: "/Dashboard/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "الصفوف",
        href: "/Dashboard/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "الدروس",
        href: "/Dashboard/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "الامتحانات",
        href: "/Dashboard/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "الواجبات",
        href: "/Dashboard/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "النتائج",
        href: "/Dashboard/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "الحضور",
        href: "/Dashboard/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "الأحداث",
        href: "/Dashboard/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "الرسائل",
        href: "/Dashboard/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "الإعلانات",
        href: "/Dashboard/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "اخرى",
    items: [
      {
        icon: "/profile.png",
        label: "الملف الشخصي",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "الإعدادات",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "تسجيل الخروج",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  return(
    <div className='flex-1 flex flex-col gap-3 p-4 overflow-y-auto' dir='rtl'>
      {/* عرض الدور الحالي */}
      <div className='mb-4 p-3 bg-Yellow rounded-lg'>
        <div className='flex items-center gap-2'>
          <span className='text-xs text-gray-600'>الدور الحالي:</span>
          <span className='text-sm font-medium text-gray-800'>
            {role === "admin" && "مدير"}
            {role === "teacher" && "معلم"}
            {role === "student" && "طالب"}
            {role === "parent" && "ولي أمر"}
          </span>
        </div>
      </div>

      {/* القائمة */}
      {menuItems.map(i => (
        <div className='flex flex-col gap-2' key={i.title}>
          <span className='hidden lg:block text-gray-700 font-medium text-sm px-3 py-2 bg-sky rounded-lg'>{i.title}</span>
          {i.items
            .filter(item => item.visible.includes(role))
            .map(item => (
              <Link href={item.href} 
              key={item.label} 
              className='flex items-center justify-center lg:justify-start gap-3 text-gray-700 hover:bg-sky rounded-lg py-2 px-3 transition-all duration-200 group'>
                <div className='p-1.5 rounded-lg bg-white group-hover:bg-sky transition-colors duration-200'>
                  <Image 
                    src={item.icon} 
                    alt={item.label} 
                    width={16} 
                    height={16} 
                    className='opacity-70 group-hover:opacity-100 transition-opacity duration-200 '
                  />
                </div>
                <span className='hidden lg:block font-medium text-sm'>{item.label}</span>
              </Link>
            ))}
        </div>
      ))}
    </div>
  )
}

export default Menu
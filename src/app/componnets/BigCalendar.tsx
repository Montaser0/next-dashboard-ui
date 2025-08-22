"use client"
import { Calendar, momentLocalizer, Views, View } from "react-big-calendar"
import moment from "moment"
import "moment/locale/ar" // 👈 استيراد اللغة العربية
import { calendarEvents } from "@/lib/data"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useState } from "react"

moment.locale("ar") // 👈 تفعيل اللغة العربية
const localizer = momentLocalizer(moment)

const messages = {
  today: "اليوم",
  previous: "السابق",
  next: "التالي",
  month: "شهر",
  week: "أسبوع",
  work_week: "أسبوع العمل",
  day: "يوم",
  agenda: "الأجندة",
  date: "التاريخ",
  time: "الوقت",
  event: "الحدث",
  showMore: total => `+${total} المزيد`,
}


const BigCalendar = () => {
    
  const [view, setView] = useState<View>(Views.WORK_WEEK)

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        views={[Views.WORK_WEEK, Views.DAY]}
        view={view}
        onView={setView}
        defaultDate={new Date(2024, 7, 12)}
        min={new Date(2025, 1, 0, 8, 0, 0)}
        max={new Date(2025, 1, 0, 17, 0, 0)}
        style={{ height: "98%" }}
        messages={messages}   // ✅ تعريب كامل
      />
    </div>
  )
}

export default BigCalendar

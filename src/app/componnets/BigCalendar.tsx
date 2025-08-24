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
}

// إضافة CSS مخصص لتعديل موضع اسم المادة وتكبير الخلايا
const customStyles = {
  event: {
    textAlign: "center" as const,
    direction: "rtl" as const,
    padding: "10px 5px",
    fontWeight: "bold",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px", // زيادة حجم الخط
  },
  // تخصيص أنماط للخلايا نفسها
  cell: {
    height: "35px", // زيادة ارتفاع الخلايا بشكل أكبر
    minHeight: "35px", // ضمان الحد الأدنى للارتفاع
  },
  // تخصيص أنماط للصف
  row: {
    minHeight: "30px", // ضمان الحد الأدنى لارتفاع الصف
  }
}

// تخصيص مكون الحدث
const EventComponent = ({ event }: any) => (
  <div style={{
    textAlign: "center",
    direction: "rtl",
    padding: "10px", // زيادة التباعد الداخلي
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    fontSize: "16px", // زيادة حجم الخط
    fontWeight: "bold",
  }}>
    {event.title}
  </div>
)

const BigCalendar = () => {
    
  const [view, setView] = useState<View>(Views.WORK_WEEK)

  return (
    <div className="mt-4">
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
        titleAccessor="title" // ✅ تحديد خاصية العنوان بشكل صريح
        formats={{
          eventTimeRangeFormat: () => "", // إخفاء وقت الحدث في العرض
          eventTimeRangeEndFormat: () => "",
        }}
        eventPropGetter={() => ({
          style: customStyles.event
        })}
        components={{
          event: EventComponent // استخدام مكون مخصص للأحداث
        }}
        // تطبيق أنماط الخلايا
        slotPropGetter={() => ({
          style: customStyles.cell
        })}
        // تطبيق أنماط الصفوف
        dayPropGetter={() => ({
          style: customStyles.row
        })}
      />
    </div>
  )
}

export default BigCalendar

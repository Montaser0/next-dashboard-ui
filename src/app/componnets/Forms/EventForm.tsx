"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import InputField from "../InputField";

const schema = z.object({
  title: z.string().min(1, { message: "عنوان الحدث مطلوب" }),
  description: z.string().min(1, { message: "وصف الحدث مطلوب" }),
  eventType: z.enum(["academic", "sports", "cultural", "meeting", "holiday", "exam"], { message: "نوع الحدث مطلوب" }),
  startDate: z.string().min(1, { message: "تاريخ البداية مطلوب" }),
  endDate: z.string().min(1, { message: "تاريخ النهاية مطلوب" }),
  startTime: z.string().min(1, { message: "وقت البداية مطلوب" }),
  endTime: z.string().min(1, { message: "وقت النهاية مطلوب" }),
  location: z.string().min(1, { message: "مكان الحدث مطلوب" }),
  organizerId: z.string().min(1, { message: "معرف المنظم مطلوب" }),
  targetAudience: z.enum(["students", "teachers", "parents", "all"], { message: "الجمهور المستهدف مطلوب" }),
  capacity: z.number().min(1, { message: "سعة الحدث مطلوبة" }),
  registrationRequired: z.boolean(),
  registrationDeadline: z.string().optional(),
  priority: z.enum(["low", "medium", "high"], { message: "أولوية الحدث مطلوبة" }),
  status: z.enum(["planned", "ongoing", "completed", "cancelled"], { message: "حالة الحدث مطلوبة" }),
  notes: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

const EventForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      eventType: data?.eventType || "academic",
      startDate: data?.startDate || "",
      endDate: data?.endDate || "",
      startTime: data?.startTime || "",
      endTime: data?.endTime || "",
      location: data?.location || "",
      organizerId: data?.organizerId || "",
      targetAudience: data?.targetAudience || "all",
      capacity: data?.capacity || 100,
      registrationRequired: data?.registrationRequired || false,
      registrationDeadline: data?.registrationDeadline || "",
      priority: data?.priority || "medium",
      status: data?.status || "planned",
      notes: data?.notes || "",
    },
  });

  useEffect(() => {
    if (data && type === "update") {
      reset({
        title: data?.title || "",
        description: data?.description || "",
        eventType: data?.eventType || "academic",
        startDate: data?.startDate || "",
        endDate: data?.endDate || "",
        startTime: data?.startTime || "",
        endTime: data?.endTime || "",
        location: data?.location || "",
        organizerId: data?.organizerId || "",
        targetAudience: data?.targetAudience || "all",
        capacity: data?.capacity || 100,
        registrationRequired: data?.registrationRequired || false,
        registrationDeadline: data?.registrationDeadline || "",
        priority: data?.priority || "medium",
        status: data?.status || "planned",
        notes: data?.notes || "",
      });
    }
  }, [data, type, reset]);

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit} dir="rtl">
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-600">
          {type === "create" ? "إنشاء حدث جديد" : "تحديث بيانات الحدث"}
        </h1>
        <p className="text-gray-400 text-lg mt-2">
          يرجى ملء جميع الحقول المطلوبة بدقة
        </p>
      </div>
      <div className="flex justify-between gap-2">
        <InputField
          label="عنوان الحدث"
          name="title"
          register={register}
          error={errors?.title}
          width="1/2"
        />
        <InputField
          label="مكان الحدث"
          name="location"
          register={register}
          error={errors?.location}
          width="1/2"
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">تفاصيل الحدث</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="وصف الحدث"
          name="description"
          register={register}
          error={errors.description}
          width="full"
        />
        <InputField
          label="تاريخ البداية"
          name="startDate"
          type="date"
          register={register}
          error={errors.startDate}
        />
        <InputField
          label="تاريخ النهاية"
          name="endDate"
          type="date"
          register={register}
          error={errors.endDate}
        />
        <InputField
          label="وقت البداية"
          name="startTime"
          type="time"
          register={register}
          error={errors.startTime}
        />
        <InputField
          label="وقت النهاية"
          name="endTime"
          type="time"
          register={register}
          error={errors.endTime}
        />
        <InputField
          label="معرف المنظم"
          name="organizerId"
          register={register}
          error={errors.organizerId}
        />
        <InputField
          label="سعة الحدث"
          name="capacity"
          type="number"
          register={register}
          error={errors.capacity}
        />
        <InputField
          label="موعد انتهاء التسجيل (اختياري)"
          name="registrationDeadline"
          type="date"
          register={register}
          error={errors.registrationDeadline}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">نوع الحدث</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer"
            {...register("eventType")}
            defaultValue={data?.eventType || "academic"}
          >
            <option value="academic">أكاديمي</option>
            <option value="sports">رياضي</option>
            <option value="cultural">ثقافي</option>
            <option value="meeting">اجتماع</option>
            <option value="holiday">عطلة</option>
            <option value="exam">امتحان</option>
          </select>
          {errors.eventType?.message && (
            <p className="text-xs text-red-400">{errors.eventType.message.toString()}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">الجمهور المستهدف</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer"
            {...register("targetAudience")}
            defaultValue={data?.targetAudience || "all"}
          >
            <option value="students">الطلاب</option>
            <option value="teachers">المعلمون</option>
            <option value="parents">أولياء الأمور</option>
            <option value="all">الجميع</option>
          </select>
          {errors.targetAudience?.message && (
            <p className="text-xs text-red-400">{errors.targetAudience.message.toString()}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">أولوية الحدث</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer"
            {...register("priority")}
            defaultValue={data?.priority || "medium"}
          >
            <option value="low">منخفضة</option>
            <option value="medium">متوسطة</option>
            <option value="high">عالية</option>
          </select>
          {errors.priority?.message && (
            <p className="text-xs text-red-400">{errors.priority.message.toString()}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">حالة الحدث</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer"
            {...register("status")}
            defaultValue={data?.status || "planned"}
          >
            <option value="planned">مخطط</option>
            <option value="ongoing">جاري</option>
            <option value="completed">مكتمل</option>
            <option value="cancelled">ملغي</option>
          </select>
          {errors.status?.message && (
            <p className="text-xs text-red-400">{errors.status.message.toString()}</p>
          )}
        </div>
        <div className="flex items-center gap-2 w-full md:w-1/4">
          <input
            type="checkbox"
            {...register("registrationRequired")}
            className="w-4 h-4"
          />
          <label className="text-xs text-gray-500">يتطلب تسجيل</label>
        </div>
        <InputField
          label="ملاحظات (اختياري)"
          name="notes"
          register={register}
          error={errors.notes}
          width="full"
        />
      </div>
      <button className={type==='create'?'bg-Yellow text-black p-2 rounded-md':'bg-sky text-black text-bold p-2 rounded-md'}>
        {type === "create" ? "إنشاء" : "تحديث"}
      </button>
    </form>
  );
};

export default EventForm;
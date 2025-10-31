"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import InputField from "../InputField";

const schema = z.object({
  studentId: z.string().min(1, { message: "معرف الطالب مطلوب" }),
  classId: z.string().min(1, { message: "معرف الصف مطلوب" }),
  subjectId: z.string().min(1, { message: "معرف المادة مطلوب" }),
  teacherId: z.string().min(1, { message: "معرف المعلم مطلوب" }),
  date: z.string().min(1, { message: "التاريخ مطلوب" }),
  status: z.enum(["present", "absent", "late", "excused"], { message: "حالة الحضور مطلوبة" }),
  arrivalTime: z.string().optional(),
  departureTime: z.string().optional(),
  notes: z.string().optional(),
  semester: z.enum(["first", "second"], { message: "الفصل الدراسي مطلوب" }),
  academicYear: z.string().min(1, { message: "السنة الأكاديمية مطلوبة" }),
});

type Inputs = z.infer<typeof schema>;

const AttendanceForm = ({
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
      studentId: data?.studentId || "",
      classId: data?.classId || "",
      subjectId: data?.subjectId || "",
      teacherId: data?.teacherId || "",
      date: data?.date || "",
      status: data?.status || "present",
      arrivalTime: data?.arrivalTime || "",
      departureTime: data?.departureTime || "",
      notes: data?.notes || "",
      semester: data?.semester || "first",
      academicYear: data?.academicYear || "",
    },
  });

  useEffect(() => {
    if (data && type === "update") {
      reset({
        studentId: data?.studentId || "",
        classId: data?.classId || "",
        subjectId: data?.subjectId || "",
        teacherId: data?.teacherId || "",
        date: data?.date || "",
        status: data?.status || "present",
        arrivalTime: data?.arrivalTime || "",
        departureTime: data?.departureTime || "",
        notes: data?.notes || "",
        semester: data?.semester || "first",
        academicYear: data?.academicYear || "",
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
          {type === "create" ? "تسجيل حضور جديد" : "تحديث بيانات الحضور"}
        </h1>
        <p className="text-gray-400 text-lg mt-2">
          يرجى ملء جميع الحقول المطلوبة بدقة
        </p>
      </div>
      <div className="flex justify-between gap-2">
        <InputField
          label="معرف الطالب"
          name="studentId"
          register={register}
          error={errors?.studentId}
          width="1/2"
        />
        <InputField
          label="معرف الصف"
          name="classId"
          register={register}
          error={errors?.classId}
          width="1/2"
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">تفاصيل الحضور</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="معرف المادة"
          name="subjectId"
          register={register}
          error={errors.subjectId}
        />
        <InputField
          label="معرف المعلم"
          name="teacherId"
          register={register}
          error={errors.teacherId}
        />
        <InputField
          label="التاريخ"
          name="date"
          type="date"
          register={register}
          error={errors.date}
        />
        <InputField
          label="وقت الوصول (اختياري)"
          name="arrivalTime"
          type="time"
          register={register}
          error={errors.arrivalTime}
        />
        <InputField
          label="وقت المغادرة (اختياري)"
          name="departureTime"
          type="time"
          register={register}
          error={errors.departureTime}
        />
        <InputField
          label="السنة الأكاديمية"
          name="academicYear"
          register={register}
          error={errors.academicYear}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">حالة الحضور</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer"
            {...register("status")}
            defaultValue={data?.status || "present"}
          >
            <option value="present">حاضر</option>
            <option value="absent">غائب</option>
            <option value="late">متأخر</option>
            <option value="excused">غياب بعذر</option>
          </select>
          {errors.status?.message && (
            <p className="text-xs text-red-400">{errors.status.message.toString()}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">الفصل الدراسي</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer"
            {...register("semester")}
            defaultValue={data?.semester || "first"}
          >
            <option value="first">الفصل الأول</option>
            <option value="second">الفصل الثاني</option>
          </select>
          {errors.semester?.message && (
            <p className="text-xs text-red-400">{errors.semester.message.toString()}</p>
          )}
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
        {type === "create" ? "تسجيل" : "تحديث"}
      </button>
    </form>
  );
};

export default AttendanceForm;
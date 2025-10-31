"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import InputField from "../InputField";

const schema = z.object({
  name: z.string().min(1, { message: "اسم الصف مطلوب" }),
  grade: z.string().min(1, { message: "المرحلة الدراسية مطلوبة" }),
  section: z.string().min(1, { message: "الشعبة مطلوبة" }),
  capacity: z.number().min(1, { message: "سعة الصف مطلوبة" }),
  currentStudents: z.number().min(0, { message: "عدد الطلاب الحالي يجب أن يكون صفر أو أكثر" }),
  supervisorId: z.string().min(1, { message: "معرف المشرف مطلوب" }),
  classroomNumber: z.string().min(1, { message: "رقم الفصل مطلوب" }),
  academicYear: z.string().min(1, { message: "السنة الأكاديمية مطلوبة" }),
  schedule: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

const ClassForm = ({
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
      name: data?.name || "",
      grade: data?.grade || "",
      section: data?.section || "",
      capacity: data?.capacity || 30,
      currentStudents: data?.currentStudents || 0,
      supervisorId: data?.supervisorId || "",
      classroomNumber: data?.classroomNumber || "",
      academicYear: data?.academicYear || "",
      schedule: data?.schedule || "",
    },
  });

  useEffect(() => {
    if (data && type === "update") {
      reset({
        name: data?.name || "",
        grade: data?.grade || "",
        section: data?.section || "",
        capacity: data?.capacity || 30,
        currentStudents: data?.currentStudents || 0,
        supervisorId: data?.supervisorId || "",
        classroomNumber: data?.classroomNumber || "",
        academicYear: data?.academicYear || "",
        schedule: data?.schedule || "",
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
          {type === "create" ? "إنشاء صف جديد" : "تحديث بيانات الصف"}
        </h1>
        <p className="text-gray-400 text-lg mt-2">
          يرجى ملء جميع الحقول المطلوبة بدقة
        </p>
      </div>
      <div className="flex justify-between gap-2">
        <InputField
          label="اسم الصف"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
          width="1/2"
        />
        <InputField
          label="المرحلة الدراسية"
          name="grade"
          defaultValue={data?.grade}
          register={register}
          error={errors?.grade}
          width="1/2"
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">تفاصيل الصف</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="الشعبة"
          name="section"
          defaultValue={data?.section}
          register={register}
          error={errors?.section}
        />
        <InputField
          label="سعة الصف"
          name="capacity"
          type="number"
          defaultValue={data?.capacity}
          register={register}
          error={errors.capacity}
        />
        <InputField
          label="عدد الطلاب الحالي"
          name="currentStudents"
          type="number"
          defaultValue={data?.currentStudents}
          register={register}
          error={errors?.currentStudents}
        />
        <InputField
          label="معرف المشرف"
          name="supervisorId"
          defaultValue={data?.supervisorId}
          register={register}
          error={errors?.supervisorId}
        />
        <InputField
          label="رقم الفصل"
          name="classroomNumber"
          defaultValue={data?.classroomNumber}
          register={register}
          error={errors?.classroomNumber}
        />
        <InputField
          label="السنة الأكاديمية"
          name="academicYear"
          defaultValue={data?.academicYear}
          register={register}
          error={errors?.academicYear}
        />
        <InputField
          label="الجدول الزمني (اختياري)"
          name="schedule"
          register={register}
          error={errors.schedule}
          width="full"
        />
      </div>
      <button className={type==='create'?'bg-Yellow text-black p-2 rounded-md':'bg-sky text-black text-bold p-2 rounded-md'}>
        {type === "create" ? "إنشاء" : "تحديث"}
      </button>
    </form>
  );
};

export default ClassForm;
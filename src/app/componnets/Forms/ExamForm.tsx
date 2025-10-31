"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import InputField from "../InputField";

const schema = z.object({
  title: z.string().min(1, { message: "عنوان الامتحان مطلوب" }),
  subjectId: z.string().min(1, { message: "معرف المادة مطلوب" }),
  classId: z.string().min(1, { message: "معرف الصف مطلوب" }),
  teacherId: z.string().min(1, { message: "معرف المعلم مطلوب" }),
  examDate: z.string().min(1, { message: "تاريخ الامتحان مطلوب" }),
  startTime: z.string().min(1, { message: "وقت البداية مطلوب" }),
  endTime: z.string().min(1, { message: "وقت النهاية مطلوب" }),
  duration: z.number().min(1, { message: "مدة الامتحان مطلوبة" }),
  totalMarks: z.number().min(1, { message: "الدرجة الكلية مطلوبة" }),
  passingMarks: z.number().min(1, { message: "درجة النجاح مطلوبة" }),
  examType: z.enum(["midterm", "final", "quiz", "assignment"], { message: "نوع الامتحان مطلوب" }),
  instructions: z.string().optional(),
  room: z.string().min(1, { message: "رقم القاعة مطلوب" }),
});

type Inputs = z.infer<typeof schema>;

const ExamForm = ({
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
      subjectId: data?.subjectId || "",
      classId: data?.classId || "",
      teacherId: data?.teacherId || "",
      examDate: data?.examDate || "",
      startTime: data?.startTime || "",
      endTime: data?.endTime || "",
      duration: data?.duration || 60,
      totalMarks: data?.totalMarks || 100,
      passingMarks: data?.passingMarks || 50,
      examType: data?.examType || "midterm",
      instructions: data?.instructions || "",
      room: data?.room || "",
    },
  });

  useEffect(() => {
    if (data && type === "update") {
      reset({
        title: data?.title || "",
        subjectId: data?.subjectId || "",
        classId: data?.classId || "",
        teacherId: data?.teacherId || "",
        examDate: data?.examDate || "",
        startTime: data?.startTime || "",
        endTime: data?.endTime || "",
        duration: data?.duration || 60,
        totalMarks: data?.totalMarks || 100,
        passingMarks: data?.passingMarks || 50,
        examType: data?.examType || "midterm",
        instructions: data?.instructions || "",
        room: data?.room || "",
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
          {type === "create" ? "إنشاء امتحان جديد" : "تحديث بيانات الامتحان"}
        </h1>
        <p className="text-gray-400 text-lg mt-2">
          يرجى ملء جميع الحقول المطلوبة بدقة
        </p>
      </div>
      <div className="flex justify-between gap-2">
        <InputField
          label="عنوان الامتحان"
          name="title"
          register={register}
          error={errors?.title}
          width="1/2"
        />
        <InputField
          label="معرف المادة"
          name="subjectId"
          register={register}
          error={errors?.subjectId}
          width="1/2"
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">تفاصيل الامتحان</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="معرف الصف"
          name="classId"
          register={register}
          error={errors.classId}
        />
        <InputField
          label="معرف المعلم"
          name="teacherId"
          register={register}
          error={errors.teacherId}
        />
        <InputField
          label="تاريخ الامتحان"
          name="examDate"
          type="date"
          register={register}
          error={errors.examDate}
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
          label="مدة الامتحان (بالدقائق)"
          name="duration"
          type="number"
          register={register}
          error={errors.duration}
        />
        <InputField
          label="الدرجة الكلية"
          name="totalMarks"
          type="number"
          register={register}
          error={errors.totalMarks}
        />
        <InputField
          label="درجة النجاح"
          name="passingMarks"
          type="number"
          register={register}
          error={errors.passingMarks}
        />
        <InputField
          label="رقم القاعة"
          name="room"
          register={register}
          error={errors.room}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">نوع الامتحان</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer"
            {...register("examType")}
            defaultValue={data?.examType || "midterm"}
          >
            <option value="midterm">امتحان نصف الفصل</option>
            <option value="final">امتحان نهائي</option>
            <option value="quiz">اختبار قصير</option>
            <option value="assignment">مهمة</option>
          </select>
          {errors.examType?.message && (
            <p className="text-xs text-red-400">{errors.examType.message.toString()}</p>
          )}
        </div>
        <InputField
          label="تعليمات الامتحان (اختياري)"
          name="instructions"
          register={register}
          error={errors.instructions}
          width="full"
        />
      </div>
      <button className={type==='create'?'bg-Yellow text-black p-2 rounded-md':'bg-sky text-black text-bold p-2 rounded-md'}>
        {type === "create" ? "إنشاء" : "تحديث"}
      </button>
    </form>
  );
};

export default ExamForm;
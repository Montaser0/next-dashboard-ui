"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import InputField from "../InputField";

const schema = z.object({
  studentId: z.string().min(1, { message: "معرف الطالب مطلوب" }),
  examId: z.string().min(1, { message: "معرف الامتحان مطلوب" }),
  subjectId: z.string().min(1, { message: "معرف المادة مطلوب" }),
  classId: z.string().min(1, { message: "معرف الصف مطلوب" }),
  marksObtained: z.number().min(0, { message: "الدرجة المحصلة يجب أن تكون صفر أو أكثر" }),
  totalMarks: z.number().min(1, { message: "الدرجة الكلية مطلوبة" }),
  percentage: z.number().min(0).max(100, { message: "النسبة المئوية يجب أن تكون بين 0 و 100" }),
  grade: z.string().min(1, { message: "التقدير مطلوب" }),
  status: z.enum(["pass", "fail", "absent"], { message: "حالة النتيجة مطلوبة" }),
  examDate: z.string().min(1, { message: "تاريخ الامتحان مطلوب" }),
  remarks: z.string().optional(),
  semester: z.enum(["first", "second"], { message: "الفصل الدراسي مطلوب" }),
  academicYear: z.string().min(1, { message: "السنة الأكاديمية مطلوبة" }),
});

type Inputs = z.infer<typeof schema>;

const ResultForm = ({
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
      examId: data?.examId || "",
      subjectId: data?.subjectId || "",
      classId: data?.classId || "",
      marksObtained: data?.marksObtained || 0,
      totalMarks: data?.totalMarks || 100,
      percentage: data?.percentage || 0,
      grade: data?.grade || "",
      status: data?.status || "pass",
      examDate: data?.examDate || "",
      remarks: data?.remarks || "",
      semester: data?.semester || "first",
      academicYear: data?.academicYear || "",
    },
  });

  useEffect(() => {
    if (data && type === "update") {
      reset({
        studentId: data?.studentId || "",
        examId: data?.examId || "",
        subjectId: data?.subjectId || "",
        classId: data?.classId || "",
        marksObtained: data?.marksObtained || 0,
        totalMarks: data?.totalMarks || 100,
        percentage: data?.percentage || 0,
        grade: data?.grade || "",
        status: data?.status || "pass",
        examDate: data?.examDate || "",
        remarks: data?.remarks || "",
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
          {type === "create" ? "إدخال نتيجة جديدة" : "تحديث بيانات النتيجة"}
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
          label="معرف الامتحان"
          name="examId"
          register={register}
          error={errors?.examId}
          width="1/2"
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">تفاصيل النتيجة</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="معرف المادة"
          name="subjectId"
          register={register}
          error={errors.subjectId}
        />
        <InputField
          label="معرف الصف"
          name="classId"
          register={register}
          error={errors.classId}
        />
        <InputField
          label="الدرجة المحصلة"
          name="marksObtained"
          type="number"
          register={register}
          error={errors.marksObtained}
        />
        <InputField
          label="الدرجة الكلية"
          name="totalMarks"
          type="number"
          register={register}
          error={errors.totalMarks}
        />
        <InputField
          label="النسبة المئوية"
          name="percentage"
          type="number"
          register={register}
          error={errors.percentage}
        />
        <InputField
          label="التقدير"
          name="grade"
          register={register}
          error={errors.grade}
        />
        <InputField
          label="تاريخ الامتحان"
          name="examDate"
          type="date"
          register={register}
          error={errors.examDate}
        />
        <InputField
          label="السنة الأكاديمية"
          name="academicYear"
          register={register}
          error={errors.academicYear}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">حالة النتيجة</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer"
            {...register("status")}
            defaultValue={data?.status || "pass"}
          >
            <option value="pass">نجح</option>
            <option value="fail">رسب</option>
            <option value="absent">غائب</option>
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
          name="remarks"
          register={register}
          error={errors.remarks}
          width="full"
        />
      </div>
      <button className={type==='create'?'bg-Yellow text-black p-2 rounded-md':'bg-sky text-black text-bold p-2 rounded-md'}>
        {type === "create" ? "إدخال" : "تحديث"}
      </button>
    </form>
  );
};

export default ResultForm;
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import InputField from "../InputField";

const schema = z.object({
  title: z.string().min(1, { message: "عنوان الواجب مطلوب" }),
  description: z.string().min(1, { message: "وصف الواجب مطلوب" }),
  subjectId: z.string().min(1, { message: "معرف المادة مطلوب" }),
  classId: z.string().min(1, { message: "معرف الصف مطلوب" }),
  teacherId: z.string().min(1, { message: "معرف المعلم مطلوب" }),
  assignedDate: z.string().min(1, { message: "تاريخ التكليف مطلوب" }),
  dueDate: z.string().min(1, { message: "تاريخ التسليم مطلوب" }),
  totalMarks: z.number().min(1, { message: "الدرجة الكلية مطلوبة" }),
  assignmentType: z.enum(["homework", "project", "research", "presentation"], { message: "نوع الواجب مطلوب" }),
  priority: z.enum(["low", "medium", "high"], { message: "أولوية الواجب مطلوبة" }),
  instructions: z.string().optional(),
  attachments: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

const AssignmentForm = ({
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
      subjectId: data?.subjectId || "",
      classId: data?.classId || "",
      teacherId: data?.teacherId || "",
      assignedDate: data?.assignedDate || "",
      dueDate: data?.dueDate || "",
      totalMarks: data?.totalMarks || 100,
      assignmentType: data?.assignmentType || "homework",
      priority: data?.priority || "medium",
      instructions: data?.instructions || "",
      attachments: data?.attachments || "",
    },
  });

  useEffect(() => {
    if (data && type === "update") {
      reset({
        title: data?.title || "",
        description: data?.description || "",
        subjectId: data?.subjectId || "",
        classId: data?.classId || "",
        teacherId: data?.teacherId || "",
        assignedDate: data?.assignedDate || "",
        dueDate: data?.dueDate || "",
        totalMarks: data?.totalMarks || 100,
        assignmentType: data?.assignmentType || "homework",
        priority: data?.priority || "medium",
        instructions: data?.instructions || "",
        attachments: data?.attachments || "",
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
          {type === "create" ? "إنشاء واجب جديد" : "تحديث بيانات الواجب"}
        </h1>
        <p className="text-gray-400 text-lg mt-2">
          يرجى ملء جميع الحقول المطلوبة بدقة
        </p>
      </div>
      <div className="flex justify-between gap-2">
        <InputField
          label="عنوان الواجب"
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
      <span className="text-xs text-gray-400 font-medium">تفاصيل الواجب</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="وصف الواجب"
          name="description"
          register={register}
          error={errors.description}
          width="full"
        />
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
          label="تاريخ التكليف"
          name="assignedDate"
          type="date"
          register={register}
          error={errors.assignedDate}
        />
        <InputField
          label="تاريخ التسليم"
          name="dueDate"
          type="date"
          register={register}
          error={errors.dueDate}
        />
        <InputField
          label="الدرجة الكلية"
          name="totalMarks"
          type="number"
          register={register}
          error={errors.totalMarks}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">نوع الواجب</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer"
            {...register("assignmentType")}
            defaultValue={data?.assignmentType || "homework"}
          >
            <option value="homework">واجب منزلي</option>
            <option value="project">مشروع</option>
            <option value="research">بحث</option>
            <option value="presentation">عرض تقديمي</option>
          </select>
          {errors.assignmentType?.message && (
            <p className="text-xs text-red-400">{errors.assignmentType.message.toString()}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">أولوية الواجب</label>
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
        <InputField
          label="تعليمات الواجب (اختياري)"
          name="instructions"
          register={register}
          error={errors.instructions}
          width="full"
        />
        <InputField
          label="المرفقات (اختياري)"
          name="attachments"
          register={register}
          error={errors.attachments}
          width="full"
        />
      </div>
      <button className={type==='create'?'bg-Yellow text-black p-2 rounded-md':'bg-sky text-black text-bold p-2 rounded-md'}>
        {type === "create" ? "إنشاء" : "تحديث"}
      </button>
    </form>
  );
};

export default AssignmentForm;
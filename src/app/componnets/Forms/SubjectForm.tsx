"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import InputField from "../InputField";

const schema = z.object({
  name: z.string().min(1, { message: "اسم المادة مطلوب" }),
  code: z.string().min(1, { message: "رمز المادة مطلوب" }),
  description: z.string().optional(),
  creditHours: z.number().min(1, { message: "عدد الساعات المعتمدة مطلوب" }),
  teacherIds: z.string().min(1, { message: "معرف المعلم مطلوب" }),
  classIds: z.string().optional(),
  semester: z.enum(["first", "second"], { message: "الفصل الدراسي مطلوب" }),
  academicYear: z.string().min(1, { message: "السنة الأكاديمية مطلوبة" }),
});

type Inputs = z.infer<typeof schema>;

const SubjectForm = ({
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
      code: data?.code || "",
      description: data?.description || "",
      creditHours: data?.creditHours || 1,
      teacherIds: data?.teacherIds || "",
      classIds: data?.classIds || "",
      semester: data?.semester || "first",
      academicYear: data?.academicYear || "",
    },
  });

  useEffect(() => {
    if (data && type === "update") {
      reset({
        name: data?.name || "",
        code: data?.code || "",
        description: data?.description || "",
        creditHours: data?.creditHours || 1,
        teacherIds: data?.teacherIds || "",
        classIds: data?.classIds || "",
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
          {type === "create" ? "إنشاء مادة جديدة" : "تحديث بيانات المادة"}
        </h1>
        <p className="text-gray-400 text-lg mt-2">
          يرجى ملء جميع الحقول المطلوبة بدقة
        </p>
      </div>
      <div className="flex justify-between gap-2">
        <InputField
          label="اسم المادة"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
          width="1/2"
        />
        <InputField
          label="رمز المادة"
          name="code"
          defaultValue={data?.code}
          register={register}
          error={errors?.code}
          width="1/2"
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">تفاصيل المادة</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="وصف المادة"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
          width="full"
        />
        <InputField
          label="عدد الساعات المعتمدة"
          name="creditHours"
          type="number"
          defaultValue={data?.creditHours}
          register={register}
          error={errors.creditHours}
        />
        <InputField
          label="معرف المعلم"
          name="teacherIds"
          defaultValue={data?.teacherIds}
          register={register}
          error={errors?.teacherIds}
        />
        <InputField
          label="معرف الصف (اختياري)"
          name="classIds"
          defaultValue={data?.classIds}
          register={register}
          error={errors.classIds}
        />
        <InputField
          label="السنة الأكاديمية"
          name="academicYear"
          register={register}
          error={errors.academicYear}
        />
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
      </div>
      <button className={type==='create'?'bg-Yellow text-black p-2 rounded-md':'bg-sky text-black text-bold p-2 rounded-md'}>
        {type === "create" ? "إنشاء" : "تحديث"}
      </button>
    </form>
  );
};

export default SubjectForm;
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "اسم المستخدم يجب أن لا يقل عن 3 أحرف" })
    .max(20, { message: "اسم المستخدم يجب أن لا يزيد عن 20 حرف" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  password: z
    .string()
    .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" }),
  firstName: z.string().min(1, { message: "الاسم الأول مطلوب" }),
  lastName: z.string().min(1, { message: "اسم العائلة مطلوب" }),
  phone: z.string().min(1, { message: "رقم الهاتف مطلوب" }),
  address: z.string().min(1, { message: "العنوان مطلوب" }),
  occupation: z.string().min(1, { message: "المهنة مطلوبة" }),
  relationship: z.enum(["father", "mother", "guardian"], { message: "صلة القرابة مطلوبة" }),
  studentIds: z.string().min(1, { message: "معرف الطالب مطلوب" }),
  img: z.any(),
});

type Inputs = z.infer<typeof schema>;

const ParentForm = ({
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

  });



  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit} dir="rtl">
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-600">
          {type === "create" ? "إنشاء ولي أمر جديد" : "تحديث بيانات ولي الأمر"}
        </h1>
        <p className="text-gray-400 text-lg mt-2">
          يرجى ملء جميع الحقول المطلوبة بدقة
        </p>
      </div>
      <div className="flex justify-between gap-2">
        <InputField
          label="اسم المستخدم"
          name="username"
          register={register}
          error={errors?.username}
          width="1/2"
        />
        <InputField
          label="البريد الإلكتروني"
          name="email"
          register={register}
          error={errors?.email}
          width="1/2"
        />
      </div>
      <InputField
        label="كلمة المرور"
        name="password"
        type="password"
        register={register}
        error={errors?.password}
        width="1/2"
      />
      <span className="text-xs text-gray-400 font-medium">المعلومات الشخصية</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="الاسم الأول"
          name="firstName"
          defaultValue={data?.username}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="اسم العائلة"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="رقم الهاتف"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="العنوان"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="المهنة"
          name="occupation"
          defaultValue={data?.occupation}
          register={register}
          error={errors.occupation}
        />
        <InputField
          label="معرف الطالب"
          name="studentIds"
          defaultValue={data?.studentIds}
          register={register} 
          error={errors.studentIds}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">صلة القرابة</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full cursor-pointer"
            {...register("relationship")}
            defaultValue={data?.relationship || "father"}
          >
            <option value="father">أب</option>
            <option value="mother">أم</option>
            <option value="guardian">ولي أمر</option>
          </select>
          {errors.relationship?.message && (
            <p className="text-xs text-red-400">{errors.relationship.message.toString()}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer border p-4 rounded-md"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>رفع صورة</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">{errors.img.message.toString()}</p>
          )}
        </div>
      </div>
      <button className={type==='create'?'bg-Yellow text-black p-2 rounded-md':'bg-sky text-black text-bold p-2 rounded-md'}>
        {type === "create" ? "إنشاء" : "تحديث"}
      </button>
    </form>
  );
};

export default ParentForm;
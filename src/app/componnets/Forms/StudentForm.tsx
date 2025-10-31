"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  bloodType: z.string().min(1, { message: "فصيلة الدم مطلوبة" }),
  birthday: z.string().min(1, { message: "تاريخ الميلاد مطلوب" }),
  sex: z.enum(["male", "female"], { message: "النوع مطلوب" }),
  img: z.any(),
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({
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
          {type === "create" ? "إنشاء معلم جديد" : "تحديث بيانات المعلم"}
        </h1>
        <p className="text-gray-400 text-lg mt-2">
          يرجى ملء جميع الحقول المطلوبة بدقة
        </p>
      </div>
      <div className="flex justify-between gap-2">
        <InputField
          label="اسم المستخدم"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
          width="1/2"
        />
        <InputField
          label="البريد الإلكتروني"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
          width="1/2"
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        المعلومات الشخصية
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="الاسم الأول"
          name="firstName"
          defaultValue={data?.firstName}
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
          label="فصيلة الدم"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label="تاريخ الميلاد"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">النوع</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
          >
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">{errors.sex.message.toString()}</p>
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

export default StudentForm;

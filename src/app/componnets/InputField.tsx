import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  width?: "1/4" | "1/3" | "1/2" | "2/3" | "3/4" | "full";
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
  width = "1/4",
}: InputFieldProps) => {
  const widthClass = {
    "1/4": "w-full md:w-1/4",
    "1/3": "w-full md:w-1/3",
    "1/2": "w-full md:w-1/2",
    "2/3": "w-full md:w-2/3",
    "3/4": "w-full md:w-3/4",
    "full": "w-full",
  };

  return (
    <div className={`flex flex-col gap-2 ${widthClass[width]}`}>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...inputProps}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;

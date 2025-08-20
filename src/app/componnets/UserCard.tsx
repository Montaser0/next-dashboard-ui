import Image from "next/image";

const UserCard = ({ type }: { type: string }) => {
    return (
        <div className=" cursor-pointer rounded-2xl odd:bg-sky even:bg-Yellow p-4 flex-1 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex justify-between items-center">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600 transition-all duration-200  hover:scale-110">
                    2025/01/01
                </span>
                <div className="p-2 transition-all duration-200  hover:scale-110 hover:rotate-12 cursor-pointer">
                    <Image src="/more.png" alt="More options" width={20} height={20} />
                </div>
            </div>
            <h1 className="text-2xl font-semibold my-4 transition-colors duration-300 ">
                1,243
            </h1>
            <h2 className="capitalize text-sm font-medium text-gray-500 text-semibold transition-all duration-200 hover:text-purple-600 hover:translate-x-2">
                {type}
            </h2>
        </div>
    )
}

export default UserCard;
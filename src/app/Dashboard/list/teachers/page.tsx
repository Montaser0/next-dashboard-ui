import Pagination from "@/app/componnets/Pagination";
import Search from "@/app/componnets/Shearch";
import Table from "@/app/componnets/Table";
import Link from "next/link";

import Image from "next/image";
import { role, teachersData } from "@/lib/data";
import FormModel from "@/app/componnets/FormModel";
interface ITeacher {
    name: string;
    photo: string;
    subjects: string[];
    classes: string[];
    phone: string;
    address: string;
    email?: string;
    id: number;
}

const columns = [
    {
        name: "اسم المعلم",
        accessor: "name",
        className: "text-center",
    },
    {
        name: "المادة",
        accessor: "subjects",
        className: "hidden md:table-cell text-center",
    },
    {
        name: "الصفوف",
        accessor: "classes",
        className: "hidden md:table-cell text-center",
    },
    {
        name: "رقم الهاتف",
        accessor: "phone",
        className: "hidden lg:table-cell text-center",
    },
    {
        name: "العنوان",
        accessor: "address",
        className: "hidden lg:table-cell text-center",
    },
    {
        name: "الاجراءات",
        accessor: "actions",
        className: "text-start",
    },

]
const Teachers = () => {
    const renderRow = (item: ITeacher) => {
        return (
            <tr key={item.name} className="hover:bg-slate-100 border-b even:bg-slate-50">
                <td className="w-full md:w-auto flex flex-row gap-3 m-3 ">
                    <Image src={item.photo} alt={item.name} width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-col ">
                        <h3 className="font-semibold">{item.name}</h3>
                        <h4 className="text-xs text-gray-500">{item?.email}</h4>
                    </div>
                </td>
                <td className="hidden md:table-cell text-center">
                    {item.subjects ? item.subjects.join("- ") : "-"}
                </td>
                <td className="hidden md:table-cell text-center">
                    {item.classes ? item.classes.join("- ") : "-"}
                </td>
                <td className="hidden lg:table-cell text-center">{item.phone}</td>
                <td className="hidden lg:table-cell text-center">{item.address}</td>
                <td>
                    <div className="flex items-center gap-2">
                        <Link href={`/Dashboard/list/teachers/${item.name}`}>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-sky p-2"><Image src="/view.png" alt="edit" width={20} height={20} /></button>
                        </Link>

                        {role === "admin" &&
                            <>
                                <FormModel table="teacher" type="delete" id={item.id} />
                                <FormModel table="teacher" type="update" data={item} />

                            </>
                        }
                    </div>
                </td>
            </tr>
        )
    }
    return (
        <div className="bg-white p-4 rounded-md mt-4" dir="rtl">
            {/* Top  */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="hidden md:block text-lg font-semibold mr-2">قائمة المعلمين</h1>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Search />
                    {/* Buttons */}
                    <div className="flex items-center gap-4 ">
                        {role === "admin" && (
                            <FormModel table="teacher" type="create" />
                        )}
                        <button className="w-8 h-8 flex   rounded-full bg-Yellow p-2"><Image src="/filter.png" alt="add" width={20} height={20} /></button>
                        <button className="w-8 h-8 flex   rounded-full bg-Yellow p-2"><Image src="/sort.png" alt="edit" width={20} height={20} /></button>
                    </div>
                </div>
            </div>
            {/* LIST */}
            <div>
                <Table columns={columns} renderRow={renderRow} data={teachersData} />
            </div>

            {/* Pagination */}
            <div>
                <Pagination />
            </div>
        </div>
    );
};

export default Teachers;

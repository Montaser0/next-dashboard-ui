import Pagination from "@/app/componnets/Pagination";
import Search from "@/app/componnets/Shearch";
import Table from "@/app/componnets/Table";
import Link from "next/link";

import Image from "next/image";
import { role, assignmentsData } from "@/lib/data";
interface IAssignment {
    subject: string;
    class: string;
    teacher: string;
    date: string;
    id: number;
}

const columns = [
    {
        name: "اسم المادة",
        accessor: "subject",
        className: "text-center",
    },
    {
        name: "الصف",
        accessor: "class",
        className: "hidden md:table-cell text-center",
    },
    {
        name: "المعلم",
        accessor: "teacher",
        className: "hidden md:table-cell text-center",
    },


    {
        name: "التاريخ",
        accessor: "date",
        className: "hidden md:table-cell hidden lg:table-cell text-center",
    },
    {
        name: "الاجراءات",
        accessor: "actions",
        className: "text-start",
    },

]
const Assignments = () => {
    const renderRow = (item: IAssignment) => (
        <tr key={item.id} className="hover:bg-slate-100 border-b even:bg-slate-50">
            <td className="w-full md:w-auto flex flex-row gap-3 m-3">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.subject}</h3>
                </div>
            </td>
            <td className="hidden md:table-cell text-center">{item.class}</td>
            <td className="hidden md:table-cell text-center">{item.teacher}</td>
            <td className="hidden lg:table-cell text-center">{item.date}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/Dashboard/list/students/${item.id}`}>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-sky p-2">
                            <Image src="/view.png" alt="view" width={20} height={20} />
                        </button>
                    </Link>
                    {role === "admin" && (
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-purple p-2">
                            <Image src="/delete.png" alt="delete" width={20} height={20} />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md mt-4" dir="rtl">
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold mr-2">قائمة الواجبات</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Search />
                    <div className="flex items-center gap-4">
                        {role === "admin" && (
                            <button className="w-8 h-8 flex   rounded-full bg-Yellow p-2"><Image src="/plus.png" alt="delete" width={20} height={20} /></button>
                        )}
                        <button className="w-8 h-8 flex rounded-full bg-Yellow p-2">
                            <Image src="/filter.png" alt="filter" width={20} height={20} />
                        </button>
                        <button className="w-8 h-8 flex rounded-full bg-Yellow p-2">
                            <Image src="/sort.png" alt="sort" width={20} height={20} />
                        </button>
                    </div>
                </div>
            </div>
            <Table columns={columns} renderRow={renderRow} data={assignmentsData} />
            <Pagination />
        </div>
    );
};

export default Assignments;


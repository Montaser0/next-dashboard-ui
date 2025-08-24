import Pagination from "@/app/componnets/Pagination";
import Search from "@/app/componnets/Shearch";
import Table from "@/app/componnets/Table";
import Link from "next/link";

import Image from "next/image";
import { role, subjectsData } from "@/lib/data";
import Parents from "../parents/page";
interface ISubject {
    name: string;
    teachers: string[];
    id: number;
}

const columns = [
    {
        name: "المادة",
        accessor: "name",
        className: "text-center",
    },

    {
        name: "الاساتذة",
        accessor: "teachers",
        className: "hidden md:table-cell text-center",
    },
    {
        name: "الاجراءات",
        accessor: "actions",
        className: "text-start",
    },

]
const Subjects = () => {
    const renderRow = (item: ISubject) => (
        <tr key={item.id} className="hover:bg-slate-100 border-b even:bg-slate-50">
            <td className="w-full md:w-auto flex flex-row gap-3 m-3">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                </div>
            </td>
            <td className="hidden md:table-cell text-center">{item.teachers.join(", ")}</td>

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
                <h2 className="hidden md:block text-lg font-semibold mr-2">قائمة  المواد</h2>
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
            <Table columns={columns} renderRow={renderRow} data={subjectsData} />
            <Pagination />
        </div>
    );
};

export default Subjects;


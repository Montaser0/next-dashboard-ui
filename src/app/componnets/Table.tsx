"use server"

import React from "react";

interface Column {
  name: string;
  accessor: string;
  className?: string;
}

interface TableProps {
  columns: Column[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}

const Table: React.FC<TableProps> = ({ columns, renderRow, data }) => {
  return (
    <table className="w-full mt-4 flex-start">
      <thead>
        <tr className="text-gray-500 text-sm">
          {columns.map((column) => (
            <th key={column.accessor} className={column.className}>
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          // هنا نستخدم renderRow مباشرة بدون إضافة <td> أخرى
          <React.Fragment key={item[columns[0].accessor]}>
            {renderRow(item)}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

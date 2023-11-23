import { Spinner } from "@chakra-ui/react";
import { TableProps } from "./model";

const Table = ({ columns, dataSource, isLoading=false }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.length > 0 ? (
              columns.map((column) => (
                <th key={column.key} className={"px-6 py-3"}>
                  <div className={"flex items-center justify-between"}>
                    {column.title}
                  </div>
                </th>
              ))
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {isLoading && <Spinner />}
          {dataSource.map((data) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={data.key}
            >
              {columns.length ? (
                columns.map((column, index) => (
                  <td key={index} className={"px-6 py-4"}>
                    {data[column.dataIndex]}
                  </td>
                ))
              ) : (
                <></>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table

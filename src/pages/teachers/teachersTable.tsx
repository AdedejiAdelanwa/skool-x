import { ITableColumn, ITableData } from "@/components/Table/model";
import { useEffect, useState } from "react";
import { Teacher } from "../api/teachers";
import { teachersTableColumns } from "./teacherColumn";
import { fetchTeachers } from "@/utils/api";
import { AppToast } from "@/components/AppToast";
import { toast } from "react-toastify";
import Table from "@/components/Table";

const TeachersTable = () => {
  const [columns, setColumns] = useState<ITableColumn[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    setColumns(teachersTableColumns);
  }, []);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetchTeachers();
        if ("error" in response) {
          const { error } = response;
          AppToast({
            type: "error",
            message: error,
            placement: toast.POSITION.TOP_LEFT,
          });
          setIsLoading(false);
        } else {
          setTeachers(response);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(`${error}`, { position: toast.POSITION.TOP_LEFT });
      }
    };
    getTeachers();
  }, []);

  const dataSource: ITableData[] =
    teachers &&
    teachers.map((row: any, index: number) => {
      return {
        uid: row.id,
        key: index,
        title: row.title,
        name: (
          <div className="flex items-center text-gray-900 text-base font-medium">
            <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {row.firstname[0]} {row.surname[0]}
              </span>
            </div>
            <div className="ml-2">{`${row.firstname} ${row.surname}`}</div>
          </div>
        ),
        doB: row.dateOfBirth,
        teacherNumber: row.teacherNumber,
        salary: row.salary,
      };
    });

  return (
    <div className="mt-5">
      <Table columns={columns} dataSource={dataSource} isLoading={isLoading} />
    </div>
  );
};
export default TeachersTable;

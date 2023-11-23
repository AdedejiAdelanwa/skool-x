import { ITableColumn, ITableData } from "@/components/Table/model";
import { useEffect, useState } from "react";
import { studentsTableColumns } from "./studentColumn";
import { fetchStudents } from "@/utils/api";
import { AppToast } from "@/components/AppToast";
import { toast } from "react-toastify";
import { Student } from "../api/students";
import Table from "@/components/Table";

const StudentsTable = () => {
  const [columns, setColumns] = useState<ITableColumn[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setColumns(studentsTableColumns);
  }, []);

  useEffect(() => {
    const getStudents = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetchStudents();
        if ("error" in response) {
          const { error } = response;
          AppToast({
            type: "error",
            message: error,
            placement: toast.POSITION.TOP_LEFT,
          });
          setIsLoading(false);
        } else {
          console.log(response);
          setStudents(response);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(`${error}`, { position: toast.POSITION.TOP_LEFT });
      }
    };
    getStudents();
  }, []);

  const dataSource: ITableData[] =
    students &&
    students.map((row: any, index: number) => {
      return {
        uid: row.id,
        key: index,
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
        studentNumber: row.studentNumber,
        nationalId: row.nationalId,
      };
    });

  return (
    <div className="mt-5">
      <Table isLoading={isLoading} columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default StudentsTable;

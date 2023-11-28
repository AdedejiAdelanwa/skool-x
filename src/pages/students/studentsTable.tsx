import { ITableColumn, ITableData } from "@/components/Table/model";
import { useCallback, useEffect, useState } from "react";
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
    (async () => {
      try {
        setIsLoading(true);
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
          setStudents(response);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(`${error}`, { position: toast.POSITION.TOP_LEFT });
      }
    })();
  }, []);

  const dataSource: ITableData[] =
    students &&
    students.map((row: any, index: number) => {
      return {
        uid: row.id,
        key: index,
        name: (
          <span className="flex items-center text-gray-900 text-base font-medium">
            <span className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {row.firstname[0]} {row.surname[0]}
              </span>
            </span>
            <span className="ml-2" data-testid={row.firstname}>{`${row.firstname} ${row.surname}`}</span>
          </span>
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

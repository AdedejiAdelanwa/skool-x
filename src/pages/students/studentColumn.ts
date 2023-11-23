import { ITableColumn } from "@/components/Table/model";

export const studentsTableColumns: ITableColumn[] = [
    {title: " Name", dataIndex: "name",key:"name"},
    {title: " National ID", dataIndex: "nationalId",key:"nationalId"},
    {title: " Date of Birth", dataIndex: "doB",key:"doB"},
    {title: " Student Number", dataIndex: "studentNumber",key:"studentNumber"},
]
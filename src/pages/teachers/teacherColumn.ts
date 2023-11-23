import { ITableColumn } from "@/components/Table/model";

export const teachersTableColumns: ITableColumn[] = [
    {title: " Title", dataIndex: "title",key:"title"},
    {title: " Name", dataIndex: "name",key:"name"},
    {title: " National ID", dataIndex: "nationalId",key:"nationalId"},
    {title: " Date of Birth", dataIndex: "doB",key:"doB"},
    {title: " Teacher Number", dataIndex: "teacherNumber",key:"teacherNumber"},
    {title: "Salary", dataIndex: "salary",key:"salary"},
]
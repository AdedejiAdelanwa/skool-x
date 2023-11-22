import { NextApiRequest, NextApiResponse } from "next";
import { User } from "./User";

export interface Teacher extends User {
  title: string;
  teacherNumber: string;
  salary?: number;
}

const teachersDatabase: Teacher[] = [
  {
    id: 1,
    nationalId: "123456789",
    firstname: "Chijioke",
    surname: "Okafor",
    title: "Mr",
    dateOfBirth: "1980-01-01",
    teacherNumber: "TN001",
    salary: 60000,
  },
  {
    id: 2,
    nationalId: "987654321",
    firstname: "Ngozi",
    surname: "Adeyemi",
    title: "Mrs",
    dateOfBirth: "1975-05-15",
    teacherNumber: "TN002",
    salary: 75000,
  },
  {
    id: 3,
    nationalId: "345678901",
    firstname: "Oluwaseun",
    surname: "Eze",
    title: "Dr",
    dateOfBirth: "1979-08-20",
    teacherNumber: "TN003",
    salary: 80000,
  },
  {
    id: 4,
    nationalId: "567890123",
    firstname: "Ifunanya",
    surname: "Ogunleye",
    title: "Miss",
    dateOfBirth: "1992-03-10",
    teacherNumber: "TN004",
  },
  {
    id: 5,
    nationalId: "234567890",
    firstname: "Chinwe",
    surname: "Okaeme",
    title: "Prof",
    dateOfBirth: "1982-12-05",
    teacherNumber: "TN005",
    salary: 90000,
  },
  {
    id: 6,
    nationalId: "876543210",
    firstname: "Emeka",
    surname: "Onwuka",
    title: "Dr",
    dateOfBirth: "1987-07-18",
    teacherNumber: "TN006",
    salary: 85000,
  },
  {
    id: 7,
    nationalId: "109876543",
    firstname: "Chiamaka",
    surname: "Adewale",
    title: "Miss",
    dateOfBirth: "1984-11-30",
    teacherNumber: "TN007",
  },
  {
    id: 8,
    nationalId: "321098765",
    firstname: "Adebayo",
    surname: "Ojo",
    title: "Mr",
    dateOfBirth: "1986-06-25",
    teacherNumber: "TN008",
    salary: 70000,
  },
  {
    id: 9,
    nationalId: "543210987",
    firstname: "Nkechi",
    surname: "Ibrahim",
    title: "Mrs",
    dateOfBirth: "1981-04-14",
    teacherNumber: "TN009",
    salary: 95000,
  },
  {
    id: 10,
    nationalId: "210987654",
    firstname: "Olamide",
    surname: "Ogunjobi",
    title: "Prof",
    dateOfBirth: "1978-09-22",
    teacherNumber: "TN010",
    salary: 100000,
  },
];

export default function createTeacher(
  req: NextApiRequest,
  res: NextApiResponse<Teacher | { error: string }>
) {
  if (req.method === "POST") {
    try {
      const {
        nationalId,
        firstname,
        surname,
        dateOfBirth,
        title,
        teacherNumber,
        salary,
      } = req.body as Omit<Teacher, "id">;

      if (
        teachersDatabase.some(
          (teacher) => teacher.teacherNumber === teacherNumber
        )
      ) {
        return res
          .status(400)
          .json({
            error: "teacher with the same teacherNumber already exists",
          });
      }
      const id = teachersDatabase.length + 1;
      const newTeacher: Teacher = {
        id,
        nationalId,
        firstname,
        surname,
        title,
        dateOfBirth,
        teacherNumber,
        salary,
      };

      teachersDatabase.push(newTeacher);
      res.status(201).json(newTeacher);
      res.statusMessage = `teacher with teacher number ${newTeacher.teacherNumber} has successfully been created`;
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }else{
    res.status(405).json({error: 'Method Not Allowed'})
  }
}

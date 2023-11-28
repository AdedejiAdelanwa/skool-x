import { NextApiRequest, NextApiResponse } from "next";
import { User } from "./User";

export interface Student extends User {
  studentNumber: string;
}

const studentsDatabase: Student[] = [
  {
    id: 1,
    nationalId: "987654321",
    firstname: "Adekanbi",
    surname: "Adeyi",
    dateOfBirth: "2001-05-15",
    studentNumber: "skx001",
  },
  {
    id: 2,
    nationalId: "687654321",
    firstname: "Adedeji",
    surname: "Adelanwa",
    dateOfBirth: "2001-07-20",
    studentNumber: "skx002",
  },
  {
    id: 3,
    nationalId: "587654321",
    firstname: "Chijioke",
    surname: "Okonkwo",
    dateOfBirth: "2000-12-10",
    studentNumber: "skx003",
  },
  {
    id: 4,
    nationalId: "487654321",
    firstname: "Ngozi",
    surname: "Eze",
    dateOfBirth: "2002-03-25",
    studentNumber: "skx004",
  },
  {
    id: 5,
    nationalId: "387654321",
    firstname: "Yakubu",
    surname: "Suleiman",
    dateOfBirth: "2000-11-05",
    studentNumber: "skx005",
  },
  {
    id: 6,
    nationalId: "287654321",
    firstname: "Zainab",
    surname: "Abubakar",
    dateOfBirth: "2002-01-18",
    studentNumber: "skx006",
  },
  {
    id: 7,
    nationalId: "187654321",
    firstname: "Chinyere",
    surname: "Ikechukwu",
    dateOfBirth: "2001-09-30",
    studentNumber: "skx007",
  },
  {
    id: 8,
    nationalId: "087654321",
    firstname: "Obinna",
    surname: "Onyema",
    dateOfBirth: "2000-06-12",
    studentNumber: "skx008",
  },
  {
    id: 9,
    nationalId: "777654321",
    firstname: "Funmilayo",
    surname: "Ogunsola",
    dateOfBirth: "2002-02-14",
    studentNumber: "skx009",
  },
  {
    id: 10,
    nationalId: "666654321",
    firstname: "Ifeoma",
    surname: "Okafor",
    dateOfBirth: "2001-04-08",
    studentNumber: "skx010",
  },
];

export const createStudent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { nationalId, firstname, surname, dateOfBirth, studentNumber } =
      req.body as Omit<Student, "id">;

    if (
      studentsDatabase.some(
        (student) => student.studentNumber === studentNumber
      )
    ) {
      return res
        .status(400)
        .json({ error: "Student with the same studentNumber already exists" });
    }

    const id = studentsDatabase.length + 1;

    const newStudent: Student = {
      id,
      nationalId,
      firstname,
      surname,
      dateOfBirth,
      studentNumber,
    };

    studentsDatabase.push(newStudent);

    res.status(201).json(newStudent);
    res.statusMessage = `Student with student number ${newStudent.studentNumber} has successfully been created`;
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchStudents = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    res.status(200).json(studentsDatabase);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Student | { error: string }>
) {
  if (req.method === "POST") {
    createStudent(req, res);
  } else if (req.method === "GET") {
    fetchStudents(req, res);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

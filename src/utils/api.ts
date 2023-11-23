import { Student } from "@/pages/api/students";
import { Teacher } from "@/pages/api/teachers";
import fetch from "isomorphic-unfetch";

export const createNewStudent = async (
  studentData: object
): Promise<Student | { error: string }> => {
  try {
   
    const response = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create new student: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating new student:", error);
    return { error: "Internal Server Error" };
  }
};
export const createNewTeacher = async(teacherData: object): Promise<Teacher | {error: string}> =>{
  try {
    const response = await fetch("/api/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacherData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create new teacher: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating new teacher:", error);
    return { error: "Internal Server Error" };
  }
}

export const fetchStudents = async(): Promise<Student[] | {error: string}> =>{
  try {
    const response = await fetch("/api/students");
    if(!response.ok){
      throw new Error(`Failed to fetch  students: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching  students:", error);
    return { error: "Internal Server Error" };
  }
}
export const fetchTeachers = async(): Promise<Teacher[] | {error: string}> =>{
  try {
    const response = await fetch("/api/teachers");
    if(!response.ok){
      throw new Error(`Failed to fetch  teachers: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching  teachers:", error);
    return { error: "Internal Server Error" };
  }
}

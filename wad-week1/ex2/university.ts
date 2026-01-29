import type { Student } from "./types";

export class University {
    public students: Student[];

    constructor() {
        this.students = [];
    }

    enrolStudent(student: Student): void {
        this.students.push(student);
    }

    findStudentById(id: string | number): Student | null {
        for (const student of this.students) {
            if (student.id === id) {
                return student;
            }
        }
        return null;
    }
}

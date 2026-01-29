import type { Student } from "./types";
import { Undergraduate } from "./undergraduate";
import { EveningStudent } from "./eveningstudent";
import { University } from "./university";

function printStudent(student: Student): void {
    const emailText = student.email ?? "no email provided";
    console.log(`ID: ${student.id}`);
    console.log(`Name: ${student.name}`);
    console.log(`Course: ${student.course}`);
    console.log(`Email: ${emailText}`);
    console.log("----");
}

const uni = new University();

const ug1 = new Undergraduate(101, "Kay Student", "Computer Science", ["OODD", "WAD"], "kay@uni.ac.uk");
ug1.addModule("DSA");

const es1 = new EveningStudent("E-77", "Sam Public", "Evening Photography");
const ug2 = new Undergraduate(202, "Mina Undergrad", "Mathematics", ["Algebra"]);

uni.enrolStudent(ug1);
uni.enrolStudent(es1);
uni.enrolStudent(ug2);

// Find + print using toString() via console.log
const found1 = uni.findStudentById(101);
console.log(found1 ? found1.toString() : "Student not found");

const found2 = uni.findStudentById("E-77");
console.log(found2 ? found2.toString() : "Student not found");

const found3 = uni.findStudentById("NOPE");
console.log(found3 ? found3.toString() : "Student not found");

// Also show printStudent works with both class instances
printStudent(ug1);
printStudent(es1);

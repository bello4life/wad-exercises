import type { Student } from "./types";

export class EveningStudent implements Student {
    public id: string | number;
    public name: string;
    public course: string;
    public email?: string;

    constructor(id: string | number, name: string, course: string, email?: string) {
        this.id = id;
        this.name = name;
        this.course = course;
        this.email = email;
    }

    toString(): string {
        const emailText = this.email ?? "no email provided";
        return `EveningStudent: ID: ${this.id} | Name: ${this.name} | Course: ${this.course} | Email: ${emailText}`;
    }
}

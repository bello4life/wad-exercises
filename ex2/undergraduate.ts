import type { Student } from "./types";

export class Undergraduate implements Student {
    public id: string | number;
    public name: string;
    public course: string;
    public email?: string;
    public modules: string[];

    constructor(id: string | number, name: string, course: string, modules: string[], email?: string) {
        this.id = id;
        this.name = name;
        this.course = course;
        this.modules = modules;
        this.email = email;
    }

    addModule(module: string): void {
        this.modules.push(module);
    }

    toString(): string {
        const moduleList = this.modules.join(",");
        const emailText = this.email ?? "no email provided";
        return `Undergraduate: ${this.name} | Course: ${this.course} | Modules: ${moduleList} | Email: ${emailText}`;
    }
}

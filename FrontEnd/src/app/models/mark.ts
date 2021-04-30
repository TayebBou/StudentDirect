export interface IMark {

    id?: String;
    module: String;
    matter: String;
    coefficient: Number;
    note: Number;
    studentId: String;
}
export class Mark implements IMark {

    id?: String;
    module: String;
    matter: String;
    coefficient: Number;
    note: Number;
    studentId: String;

    constructor(id: String, module: String, matter: String, coefficient: Number, note: Number, studentId: String) {
        this.id = id;
        this.module = module;
        this.matter = matter;
        this.coefficient = coefficient;
        this.note = note;
        this.studentId = studentId;
    }
}
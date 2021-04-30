import { Exam } from './exam';

export interface IMatter {

    _id?: String;
    name: String;
    coefficient: number;
    average?: number;
    exams: Exam[];
}
export class Matter implements IMatter {

    _id?: String;
    name: String;
    coefficient: number;
    average?: number;
    exams: Exam[];

    constructor(id: String, name: String, coefficient: number, average: number, exams: Exam[]) {
        this._id = id;
        this.name = name;
        this.coefficient = coefficient;
        this.average = average;
        this.exams = exams;
    }
}
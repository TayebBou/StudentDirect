export interface IExam {

    _id?: String;
    name: String;
    mark: number;
    studentId: String;
    matterId: String;
}
export class Exam implements IExam {

    _id?: String;
    name: String;
    mark: number;
    studentId: String;
    matterId: String;

    constructor(_id: String, name: String, mark: number, studentId: String, matterId: String) {
        this._id = _id;
        this.name = name;
        this.mark = mark;
        this.studentId = studentId;
        this.matterId = matterId;
    }
}
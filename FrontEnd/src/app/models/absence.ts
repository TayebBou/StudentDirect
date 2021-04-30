export interface IAbsence {

    id?: String;
    session: Number;
    date: Date;
    matter: String;
    justification: String;
    studentId: String;
}
export class Absence implements IAbsence {

    id?: String;
    session: Number;
    date: Date;
    matter: String;
    justification: String;
    studentId: String;

    constructor(id: String, session: Number, date: Date, matter: String, justification: String, studentId: String) { 
        this.id = id;
        this.session = session;
        this.date = date;
        this.matter = matter;
        this.justification = justification;
        this.studentId = studentId;
    }
}
export interface IDelay {

    id?: String;
    session: Number;
    matter: String;
    durationInMin: Number;
    date: Date;
    reasonDelay: String;
    studentId: String;
}
export class Delay implements IDelay {

    id?: String;
    session: Number;
    matter: String;
    durationInMin: Number;
    date: Date;
    reasonDelay: String;
    studentId: String;

    constructor(id: String, session: Number, date: Date, matter: String, reasonDelay: String, durationInMin: Number, studentId: String) {
        this.id = id;
        this.session = session;
        this.matter = matter;
        this.durationInMin = durationInMin;
        this.date = date;
        this.reasonDelay = reasonDelay;
        this.studentId = studentId;
    }
}
export interface IPayment {

    id?: String;
    paymentDate: Date;
    modePayment: String;
    amountPaid: Number;
    studentId: String;
}
export class Payment implements IPayment {

    id?: String;
    paymentDate: Date;
    modePayment: String;
    amountPaid: Number;
    studentId: String;

    constructor(id: String, paymentDate: Date, modePayment: String, amountPaid: Number, studentId: String) { 
        this.id = id;
        this.paymentDate = paymentDate;
        this.modePayment = modePayment;
        this.amountPaid = amountPaid;
        this.studentId = studentId;
    }
}
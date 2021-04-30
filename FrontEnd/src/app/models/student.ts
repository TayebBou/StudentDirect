export interface IStudent {

    id: String;
    cin: String;
    lastName: String;
    firstName: String;
    sexe: String;
    specialty?: String;
    email: String;
    level?: String;
    numberPhone: String;
}
export class Student implements IStudent {

    id: String;
    cin: String;
    lastName: String;
    firstName: String;
    sexe: String;
    specialty?: String;
    email: String;
    level?: String;
    numberPhone: String;

    constructor(id: String, cin: string, lastName: String, firstName: String, sexe: String, email: String, numberPhone: String, level?: String, specialty?: String) { 
        this.id = id;
        this.cin = cin;
        this.lastName = lastName;
        this.firstName = firstName;
        this.sexe = sexe;
        this.specialty = specialty;
        this.email = email;
        this.level = level;
        this.numberPhone = numberPhone;
    }
}
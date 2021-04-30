export interface IAccount {

    id: String;
    login: String;
    email: String;
    password: String;
    role: String;
}
export class Student implements IAccount {

    id: String;
    login: String;
    email: String;
    password: String;
    role: String;

    constructor(id: String, login: string, email: String, password: String, role: String) { 
        this.id = id;
        this.login = login;
        this.email = email;
        this.password = password;
        this.role = role;
    }

}
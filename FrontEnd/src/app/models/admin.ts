export interface IAdmin {

    id?: String;
    lastName: String;
    firstName: String;
    login: String;
    email: String;
    password?: String;
}
export class Admin implements IAdmin {

    id?: String;
    lastName: String;
    firstName: String;
    login: String;
    email: String;
    password?: String;

    constructor(id: String, lastName: String, firstName: String, login: string, email: String, password: String) { 
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.login = login;
        this.email = email;
        this.password = password;
    }

}
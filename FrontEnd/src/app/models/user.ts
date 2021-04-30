export interface IUser {

    _id?: String;
    lastName: String;
    firstName: String;
    login: String;
    email: String;
    password?: String;
    role: String;
}
export class User implements IUser {

    _id?: String;
    lastName: String;
    firstName: String;
    login: String;
    email: String;
    password?: String;
    role: String;

    constructor(id: String, lastName: String, firstName: String, login: string, email: String, password: String, role: String) { 
        this._id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.login = login;
        this.email = email;
        this.password = password;
        this.role = role;
    }

}
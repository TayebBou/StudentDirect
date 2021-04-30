import { Injectable } from '@angular/core';
import { Student } from '../models/student';


@Injectable({
    providedIn: 'root',
})

export class EtudiantService {

    tableStudents: Student[] = [];

    constructor() {
    }
    AddStudent(value) {
        this.tableStudents.push(new Student(
            value.cin,
            value.lastName,
            value.firstName,
            value.sexe,
            value.specialty,
            value.email,
            value.numberPhone
        ));
        console.log(this.tableStudents);
    }
}
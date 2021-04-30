import { Matter } from './matter';
import { Exam } from './exam';

export interface IModule {

    _id?: String;
    name: String;
    average?: number;
    level: String;
    matters: Matter[];
}
export class Module implements IModule {

    _id?: String;
    name: String;
    average?: number;
    level: String;
    matters: Matter[];
    
    constructor(_id: String, name: String, average: number, level: String, matters: Matter[]) {
        this._id = _id;
        this.name = name;
        this.average = average;
        this.level = level;
        this.matters = matters;
    }
}
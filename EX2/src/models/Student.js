import Person from './Person.js';
class Student extends Person {
    constructor(
        name,
        age,
        gender,
        university = 'Technical University',
        major = 'Informatics',
        faculty = 'Computing'
    ) {
        super(name, age, gender);
        this.university = university;
        this.major = major;
        this.faculty = faculty;
    }
    study() {
        return `${this.name} studies ${this.major} at ${this.university}, faculty: ${this.faculty}.`;
    }
}
export default Student;

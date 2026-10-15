import Person from './Person.js';
class Employee extends Person {
    constructor(name, age, gender, jobTitle = 'Developer', salary = 2000, department = 'IT') {
        super(name, age, gender);
        this.jobTitle = jobTitle;
        this.salary = salary;
        this.department = department;
    }
    work() {
        return `${this.name} works as a ${this.jobTitle} in ${this.department}. Salary: ${this.salary}.`;
    }
}
export default Employee;

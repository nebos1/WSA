class Person {
    constructor(name, age = 20, gender = 'Not specified') {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    introduce() {
        return `${this.name}, age: ${this.age}, gender: ${this.gender}`;
    }
}
export default Person;

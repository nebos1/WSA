import { useState } from 'react';
import Employee from '../models/Employee.js';
import Student from '../models/Student.js';

function People() {
    const [name, setName] = useState('');
    const [type, setType] = useState('student');
    const [people, setPeople] = useState([]);
    const [percentages, setPercentages] = useState([]);
    const [error, setError] = useState('');

    function addPerson() {
        if (name.trim() === '') {
            setError('Enter a name.');
            return;
        }
        let person;
        if (type === 'student') {
            person = new Student(name.trim());
        }
        else {
            person = new Employee(name.trim());
        }
        const newItems = people.slice();
        newItems.push(person);
        setPeople(newItems);
        setPercentages([]);
        setError('');
    }

    function countNames() {
        const names = new Set(people.map((person) => person.name));
        const results = [];
        for (const name of names) {
            const count = people.filter((person) => person.name === name).length;
            const text = `${name}: ${((count / people.length) * 100).toFixed(2)}%`;
            console.log(text);
            results.push(text);
        }
        setPercentages(results);
    }

    return (
        <section>
            <h2>Tasks 1 and 2 — People and Inheritance</h2>
            <label htmlFor="name">Name</label>
            <input id="name" value={name} onChange={(event) => setName(event.target.value)} />
            <fieldset>
                <legend>Person type</legend>
                <label>
                    <input type="radio" checked={type === 'student'} onChange={() => setType('student')} />
                    Student
                </label>
                <label>
                    <input type="radio" checked={type === 'employee'} onChange={() => setType('employee')} />
                    Employee
                </label>
            </fieldset>
            <div className="buttons">
                <button onClick={addPerson}>Add Person</button>
                <button onClick={countNames} disabled={!people.length}>
                    Name Percentages (Console)
                </button>
            </div>
            <p className="error" role="status">
                {error}
            </p>
            {people.map((person, index) => (
                <article key={index}>
                    <p>{person.introduce()}</p>
                    <p>{person instanceof Student ? person.study() : person.work()}</p>
                </article>
            ))}
            {percentages.map((text) => (
                <p key={text}>{text}</p>
            ))}
        </section>
    );
}
export default People;

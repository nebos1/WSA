import { useState } from 'react';
function People() {
    const [people, setPeople] = useState([]);
    const [filter, setFilter] = useState('all');
    const [type, setType] = useState('student');
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [majorDept, setMajorDept] = useState('');
    const [salary, setSalary] = useState('');
    const [message, setMessage] = useState('');
    async function loadData() {
        try {
            const response = await fetch('./data.json');
            if (!response.ok) {
                throw new Error('Could not load data.json.');
            }
            const data = await response.json();
            setPeople(data);
            setMessage('Data loaded.');
        } catch (error) {
            setMessage(error.message);
        }
    }
    function addPerson() {
        if (!name.trim() || !majorDept.trim()) {
            setMessage('Enter a name and major or department.');
            return;
        }
        const parts = birthDate.split('.');
        const date = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
        if (
            !/^\d{2}\.\d{2}\.\d{4}$/.test(birthDate) ||
            date.getFullYear() !== Number(parts[2]) ||
            date.getMonth() !== Number(parts[1]) - 1 ||
            date.getDate() !== Number(parts[0])
        ) {
            setMessage('Enter a valid birth date: DD.MM.YYYY.');
            return;
        }
        const person = { type, name: name.trim(), birthDate, majorDept: majorDept.trim() };
        if (type === 'employee') {
            const value = Number(salary.replace(',', '.'));
            if (salary.trim() === '' || !Number.isFinite(value) || value < 0) {
                setMessage('Enter a valid non-negative salary.');
                return;
            }
            person.salary = value;
        }
        const newItems = people.slice();
        newItems.push(person);
        setPeople(newItems);
        setMessage('Record added.');
        setName('');
        setBirthDate('');
        setMajorDept('');
        setSalary('');
    }
    const visiblePeople = people.filter((person) => filter === 'all' || person.type === filter);
    return (
        <section>
            <h2>Fetch and Array Tasks — People</h2>
            <div className="buttons">
                <button onClick={loadData}>Load data.json</button>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('student')}>Students</button>
                <button onClick={() => setFilter('employee')}>Employees</button>
            </div>
            <p role="status">{message}</p>
            <p>Filter: {filter}</p>
            <div>
                {visiblePeople.map((person, index) => (
                    <article key={index}>
                        {person.name} — {person.type}, {person.birthDate}, {person.majorDept}
                        {person.type === 'employee' ? `, salary: ${person.salary}` : ''}
                    </article>
                ))}
            </div>
            <label htmlFor="type">Type</label>
            <select id="type" value={type} onChange={(event) => setType(event.target.value)}>
                <option value="student">Student</option>
                <option value="employee">Employee</option>
            </select>
            <label htmlFor="name">Name</label>
            <input id="name" value={name} onChange={(event) => setName(event.target.value)} />
            <label htmlFor="birth">Birth Date (DD.MM.YYYY)</label>
            <input id="birth" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
            <label htmlFor="major">Major / Department</label>
            <input id="major" value={majorDept} onChange={(event) => setMajorDept(event.target.value)} />
            {type === 'employee' && (
                <>
                    <label htmlFor="salary">Salary</label>
                    <input id="salary" value={salary} onChange={(event) => setSalary(event.target.value)} />
                </>
            )}
            <div className="buttons">
                <button onClick={addPerson}>Add Record</button>
            </div>
        </section>
    );
}
export default People;

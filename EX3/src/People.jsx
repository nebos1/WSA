import { useState } from 'react';

const storageKey = 'ex3-people';
function People() {
    const [people, setPeople] = useState([]);
    const [filter, setFilter] = useState('all');
    const [name, setName] = useState('');
    const [type, setType] = useState('student');
    const [birthDate, setBirthDate] = useState('');
    const [majorDept, setMajorDept] = useState('');
    const [salary, setSalary] = useState('');
    const [selected, setSelected] = useState(-1);
    const [message, setMessage] = useState('Load data.json or load saved records to begin.');

    function save(nextPeople) {
        try {
            localStorage.setItem(storageKey, JSON.stringify(nextPeople));
            setPeople(nextPeople);
            setMessage('Data saved in localStorage.');
            return true;
        } catch {
            setMessage('Could not save to localStorage.');
            return false;
        }
    }

    async function loadData() {
        try {
            const response = await fetch('./data.json');
            if (!response.ok) {
                throw new Error('Could not load data.json.');
            }
            const data = await response.json();
            if (save(data)) {
                setSelected(-1);
                setFilter('all');
            }
        } catch (error) {
            setMessage(error.message);
        }
    }

    function loadSaved() {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved === null) {
                setMessage('No saved records. Load data.json first.');
                return;
            }
            const data = JSON.parse(saved);
            if (
                !Array.isArray(data) ||
                !data.every(
                    (person) =>
                        person &&
                        typeof person.name === 'string' &&
                        ['student', 'employee'].includes(person.type)
                )
            ) {
                throw new Error();
            }
            setPeople(data);
            setSelected(-1);
            setFilter('all');
            setMessage('Saved records loaded. Select a record to edit.');
        } catch {
            setMessage('Could not read saved records.');
        }
    }

    function clearForm() {
        setSelected(-1);
        setName('');
        setType('student');
        setBirthDate('');
        setMajorDept('');
        setSalary('');
    }

    function readForm() {
        if (!name.trim() || !majorDept.trim()) {
            setMessage('Enter a name and major or department.');
            return null;
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
            return null;
        }
        const person = { type, name: name.trim(), birthDate, majorDept: majorDept.trim() };
        if (type === 'employee') {
            const value = Number(salary.replace(',', '.'));
            if (salary.trim() === '' || !Number.isFinite(value) || value < 0) {
                setMessage('Enter a valid non-negative salary.');
                return null;
            }
            person.salary = value;
        }
        return person;
    }

    function addPerson() {
        const person = readForm();
        if (person) {
            const newPeople = people.slice();
            newPeople.push(person);
            if (save(newPeople)) {
                clearForm();
            }
        }
    }

    function selectPerson(index) {
        const person = people[index];
        if (!person) {
            return;
        }
        setSelected(index);
        setName(person.name);
        setType(person.type);
        setBirthDate(person.birthDate);
        setMajorDept(person.majorDept);
        setSalary(String(person.salary ?? ''));
    }

    function editPerson() {
        const person = readForm();
        if (!person || selected < 0) {
            return;
        }
        const nextPeople = people.slice();
        nextPeople[selected] = person;
        save(nextPeople);
    }

    function deletePerson() {
        const nextPeople = people.filter((person, index) => index !== selected);
        if (save(nextPeople)) {
            clearForm();
        }
    }

    const visible = people
        .map((person, index) => ({ person, index }))
        .filter((entry) => filter === 'all' || entry.person.type === filter);
    return (
        <section>
            <h2>Tasks 1–3 — Fetch, Arrays and localStorage</h2>
            <div className="buttons">
                <button onClick={loadData}>Load data.json (Reset Saved Data)</button>
                <button onClick={loadSaved}>Load from localStorage</button>
            </div>
            <div className="buttons">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('student')}>Students</button>
                <button onClick={() => setFilter('employee')}>Employees</button>
            </div>
            <p role="status">{message}</p>
            <p>
                Records: {people.length}. Filter: {filter}.
            </p>
            <div>
                {visible.map(({ person, index }) => (
                    <article key={index}>
                        <p>
                            {person.name} — {person.type}, {person.birthDate}, {person.majorDept}
                            {person.type === 'employee' ? `, salary: ${person.salary}` : ''}
                        </p>
                        <button onClick={() => selectPerson(index)}>Load Record {index + 1}</button>
                    </article>
                ))}
            </div>
            <h3>{selected < 0 ? 'New Record' : `Record ${selected + 1} of ${people.length}`}</h3>
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
                <button disabled={selected < 0} onClick={editPerson}>
                    Save Changes
                </button>
                <button disabled={selected < 0} onClick={deletePerson}>
                    Delete Record
                </button>
                <button onClick={clearForm}>New Record</button>
            </div>
            <div className="buttons">
                <button
                    disabled={!people.length || selected === 0}
                    onClick={() => selectPerson(selected < 0 ? 0 : selected - 1)}
                >
                    Previous Record
                </button>
                <button
                    disabled={!people.length || selected === people.length - 1}
                    onClick={() => selectPerson(selected + 1)}
                >
                    Next Record
                </button>
            </div>
        </section>
    );
}
export default People;

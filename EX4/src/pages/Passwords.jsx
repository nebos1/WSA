import { useState } from 'react';
import { generatePassord, passwordStrength } from '../Modules/passwordTools.js';

function Passwords() {
    const [type, setType] = useState('digits');
    const [passwords, setPasswords] = useState([]);
    const [strengths, setStrengths] = useState([]);
    function generate() {
        const length = Math.floor(Math.random() * 18) + 3;
        const password = generatePassord(length, type);
        const newItems = passwords.slice();
        newItems.push(password);
        setPasswords(newItems);
    }
    function checkStrength(index) {
        const nextStrengths = strengths.slice();
        nextStrengths[index] = passwordStrength(passwords[index]);
        setStrengths(nextStrengths);
    }
    return (
        <section>
            <h2>Tasks 1 and 2 — Password Modules</h2>
            <fieldset>
                <legend>Password type</legend>
                <label>
                    <input type="radio" checked={type === 'digits'} onChange={() => setType('digits')} />
                    Digits
                </label>
                <label>
                    <input type="radio" checked={type === 'letters'} onChange={() => setType('letters')} />
                    Letters
                </label>
            </fieldset>
            <button onClick={generate}>Generate Password (3–20 Characters)</button>
            {passwords.map((password, index) => (
                <article key={index}>
                    <p>
                        <code>{password.toString()}</code> — {password.getType()},{' '}
                        {password.toString().length} characters
                    </p>
                    <button onClick={() => checkStrength(index)}>Check Strength</button>
                    {strengths[index] !== undefined && (
                        <span className={`strength strength-${strengths[index]}`}>
                            {['Weak', 'Good', 'Strong'][strengths[index]]}
                        </span>
                    )}
                </article>
            ))}
        </section>
    );
}
export default Passwords;

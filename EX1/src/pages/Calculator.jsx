import { useState } from 'react';

function Calculator() {
    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [result, setResult] = useState('');

    const a = Number(first.replace(',', '.'));
    const b = Number(second.replace(',', '.'));

    function sum() {
        setResult(a + b);
    }

    function subtract() {
        setResult(a - b);
    }

    function multiply() {
        setResult(a * b);
    }

    function divide() {
        if (b === 0) {
            setResult('Cannot divide by zero.');
            return;
        }

        setResult(a / b);
    }

    function power() {
        setResult(a ** b);
    }

    function squareRoot() {
        if (a < 0) {
            setResult('Cannot take the square root of a negative number.');
            return;
        }

        setResult(Math.sqrt(a));
    }

    return (
        <section>
            <h2>Tasks 1 and 2 — Calculator</h2>

            <label htmlFor="first-number">First Number</label>
            <input
                id="first-number"
                type="text"
                value={first}
                onChange={(event) => setFirst(event.target.value)}
            />

            <label htmlFor="second-number">Second Number</label>
            <input
                id="second-number"
                type="text"
                value={second}
                onChange={(event) => setSecond(event.target.value)}
            />

            <div className="buttons">
                <button id="sum" onClick={sum}>
                    Add (+)
                </button>
                <button onClick={subtract}>Subtract (−)</button>
                <button onClick={multiply}>Multiply (×)</button>
                <button onClick={divide}>Divide (÷)</button>
                <button onClick={power}>Power (aᵇ)</button>
                <button onClick={squareRoot}>Square Root (√a)</button>
            </div>

            <p>
                The power function uses the first number as the base and the second as the exponent. The
                square root is calculated from the first number.
            </p>
            <p aria-live="polite">
                Result: <span id="result">{result}</span>
            </p>
        </section>
    );
}

export default Calculator;

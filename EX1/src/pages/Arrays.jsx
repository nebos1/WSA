import { useState } from 'react';

function Arrays() {
    const [items, setItems] = useState([]);
    const [value, setValue] = useState('');
    const [index, setIndex] = useState('');
    const [error, setError] = useState('');

    function addLast() {
        const newItems = items.slice();
        newItems.push(value);
        setItems(newItems);
        setError('');
    }

    function addFirst() {
        const newItems = items.slice();
        newItems.unshift(value);
        setItems(newItems);
        setError('');
    }

    function removeFirst() {
        const newItems = items.slice();
        newItems.shift();
        setItems(newItems);
        setError('');
    }

    function removeLast() {
        const newItems = items.slice();
        newItems.pop();
        setItems(newItems);
        setError('');
    }

    function editItem() {
        const position = Number(index);

        if (index.trim() === '' || !Number.isInteger(position) || position < 0 || position >= items.length) {
            setError('Insert a valid index.');
            return;
        }

        const newItems = items.slice();
        newItems[position] = value;
        setItems(newItems);
        setError('');
    }

    return (
        <section>
            <h2>Task 3 — Working with Arrays</h2>

            <label htmlFor="array-value">Text Value</label>
            <input
                id="array-value"
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />

            <div className="buttons">
                <button onClick={addLast}>Add to End</button>
                <button onClick={addFirst}>Add to Beginning</button>
                <button onClick={removeFirst}>Remove First Item</button>
                <button onClick={removeLast}>Remove Last Item</button>
            </div>

            <label htmlFor="array-index">Index of Element (from 0)</label>
            <input
                id="array-index"
                type="text"
                value={index}
                onChange={(event) => setIndex(event.target.value)}
            />

            <div className="buttons">
                <button onClick={editItem}>Edit Cell</button>
            </div>

            <p className="error" aria-live="polite">
                {error}
            </p>
            <p aria-live="polite">
                Array: <output>{JSON.stringify(items)}</output>
            </p>
            <p>Number of Elements: {items.length}</p>
        </section>
    );
}

export default Arrays;

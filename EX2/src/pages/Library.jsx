import { useState } from 'react';
import library from '../data/library.js';

function Library() {
    const [result, setResult] = useState('');
    const [month, setMonth] = useState('2023-09');

    function available() {
        setResult(
            library
                .filter((book) => book.copies.some((copy) => copy.isAvailable))
                .map((book) => book.title)
                .join('\n')
        );
    }

    function classics() {
        setResult(
            library
                .filter((book) => book.genres.includes('Classics'))
                .map((book) => book.title)
                .join('\n')
        );
    }

    function borrowed() {
        setResult(
            library
                .filter((book) => book.borrowedHistory.some((loan) => loan.dateReturned === null))
                .map((book) => book.title)
                .join('\n')
        );
    }

    function mostBorrowed() {
        let highest = 0;
        for (const book of library) {
            if (book.borrowedHistory.length > highest) {
                highest = book.borrowedHistory.length;
            }
        }
        setResult(
            library
                .filter((book) => book.borrowedHistory.length === highest)
                .map((book) => `${book.title}: ${highest} loans`)
                .join('\n')
        );
    }

    function totalCopies() {
        let total = 0;
        for (const book of library) {
            total += book.copies.filter((copy) => copy.isAvailable).length;
        }
        setResult(`Available copies: ${total}`);
    }

    function borrowedInMonth() {
        if (!month) {
            setResult('Choose a month.');
            return;
        }

        const start = new Date(`${month}-01T00:00:00`);
        const end = new Date(start);
        end.setMonth(end.getMonth() + 1);
        const books = library.filter((book) =>
            book.borrowedHistory.some((loan) => {
                const date = new Date(`${loan.dateBorrowed}T00:00:00`);
                return date >= start && date < end;
            })
        );
        setResult(books.map((book) => book.title).join('\n') || 'No books borrowed in this month.');
    }

    function topUser() {
        const users = new Map();
        for (const book of library) {
            for (const loan of book.borrowedHistory) {
                if (!users.has(loan.userId)) {
                    users.set(loan.userId, new Set());
                }
                users.get(loan.userId).add(book.id);
            }
        }
        let highest = 0;
        for (const books of users.values()) {
            if (books.size > highest) {
                highest = books.size;
            }
        }
        const results = [];
        for (const [id, books] of users) {
            if (books.size === highest) {
                results.push(`User ${id}: ${books.size} different books`);
            }
        }
        setResult(results.join('\n') || 'No loans.');
    }
    return (
        <section>
            <h2>Task 4 — Library</h2>
            {library.map((book) => (
                <article key={book.id}>
                    <h3>{book.title}</h3>
                    <p>
                        {book.author} — {book.genres.join(', ')}
                    </p>
                    <p>
                        Available copies: {book.copies.filter((copy) => copy.isAvailable).length}; loans:{' '}
                        {book.borrowedHistory.length}
                    </p>
                </article>
            ))}
            <div className="buttons">
                <button onClick={available}>Available Titles</button>
                <button onClick={classics}>Classics</button>
                <button onClick={borrowed}>Unfinished Loans</button>
                <button onClick={mostBorrowed}>Most Borrowed Book</button>
                <button onClick={totalCopies}>Available Copies</button>
                <button onClick={topUser}>Most Different Books per User</button>
            </div>
            <label htmlFor="month">Borrowing month (sample data: September 2023)</label>
            <input id="month" type="month" value={month} onChange={(event) => setMonth(event.target.value)} />
            <div className="buttons">
                <button onClick={borrowedInMonth}>Books Borrowed in Month</button>
            </div>
            <pre role="status">{result}</pre>
        </section>
    );
}
export default Library;

import { useState } from 'react';

function Points() {
    const [points, setPoints] = useState('');
    const [color, setColor] = useState('');
    const [entries, setEntries] = useState([]);
    const [chart, setChart] = useState([]);
    const [error, setError] = useState('');

    function addEntry() {
        const value = Number(points.replace(',', '.'));

        if (points.trim() === '' || !Number.isFinite(value) || value < 0) {
            setError('Enter a valid non-negative number of points.');
            return;
        }

        if (!CSS.supports('color', color.trim())) {
            setError('Enter a valid color (e.g., red or #aaff00).');
            return;
        }

        const newEntries = entries.slice();
        newEntries.push([value, color.trim()]);
        setEntries(newEntries);
        setError('');
    }

    function drawChart() {
        setChart(entries.slice());
    }

    let maxPoints = 1;

    for (let i = 0; i < chart.length; i++) {
        if (chart[i][0] > maxPoints) {
            maxPoints = chart[i][0];
        }
    }

    const chartWidth = Math.max(400, chart.length * 75);

    return (
        <section>
            <h2>Task 4 — Data Visualization</h2>

            <label htmlFor="points">Number of Points</label>
            <input
                id="points"
                type="text"
                value={points}
                onChange={(event) => setPoints(event.target.value)}
            />

            <label htmlFor="color">Color (e.g., red or #aaff00)</label>
            <input id="color" type="text" value={color} onChange={(event) => setColor(event.target.value)} />

            <div className="buttons">
                <button onClick={addEntry}>Add Entry</button>
                <button onClick={drawChart}>Draw Chart</button>
            </div>

            <p className="error" aria-live="polite">
                {error}
            </p>
            <p aria-live="polite">
                Data: <output>{JSON.stringify(entries)}</output>
            </p>

            <div className="chart">
                <svg width={chartWidth} height="280" role="img" aria-label="Bar chart of points per user">
                    <title>Points per user</title>
                    {chart.map((entry, index) => {
                        const height = (entry[0] / maxPoints) * 200;
                        const x = 25 + index * 75;

                        return (
                            <g key={index}>
                                <rect x={x} y={230 - height} width="45" height={height} fill={entry[1]} />
                                <text x={x + 22.5} y={220 - height} textAnchor="middle">
                                    {entry[0]}
                                </text>
                                <text x={x + 22.5} y="255" textAnchor="middle">
                                    User {index + 1}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </section>
    );
}

export default Points;

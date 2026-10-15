import { useState } from 'react';
import team from '../data/team.js';

function Football() {
    const [result, setResult] = useState('');

    function forwards() {
        setResult(
            team
                .filter((player) => player.position === 'forward' && player.goals >= 10)
                .map((player) => player.name)
                .join(', ')
        );
    }

    function totalGoals() {
        let total = 0;
        for (const player of team) {
            total += player.goals;
        }
        setResult(`Total goals: ${total}`);
    }

    function yellowCards() {
        setResult(
            team
                .filter((player) => player.yellowCards > 3)
                .map((player) => player.name)
                .join(', ')
        );
    }

    function injured() {
        setResult(
            team
                .filter((player) => player.injuries.some((injury) => injury.recovered === false))
                .map((player) => player.name)
                .join(', ')
        );
    }

    function averageGoals() {
        const averages = team.map((player) => ({
            name: player.name,
            average: player.gamesPlayed === 0 ? 0 : player.goals / player.gamesPlayed
        }));
        averages.sort((a, b) => b.average - a.average);
        setResult(
            averages.map((player) => `${player.name}: ${player.average.toFixed(2)} goals per game`).join('\n')
        );
    }

    function mostMissed() {
        let highest = -1;
        let names = [];
        for (const player of team) {
            let missed = 0;
            for (const injury of player.injuries) {
                missed += injury.missedGames;
            }
            if (missed > highest) {
                highest = missed;
                names = [player.name];
            }
            else if (missed === highest) {
                names.push(player.name);
            }
        }
        setResult(`${names.join(', ')}: ${highest} missed games`);
    }

    function midfielders() {
        setResult(
            team
                .filter(
                    (player) =>
                        player.position === 'midfielder' && player.assists >= 5 && player.redCards === 0
                )
                .map((player) => player.name)
                .join(', ')
        );
    }

    function totalMissed() {
        let total = 0;
        for (const player of team) {
            for (const injury of player.injuries) {
                total += injury.missedGames;
            }
        }
        setResult(`Total missed games: ${total}`);
    }

    return (
        <section>
            <h2>Task 3 — Football Team</h2>
            <div className="table-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Goals</th>
                            <th>Assists</th>
                            <th>Yellow</th>
                            <th>Red</th>
                            <th>Games</th>
                            <th>Injuries</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map((player) => (
                            <tr key={player.id}>
                                <td>{player.name}</td>
                                <td>{player.position}</td>
                                <td>{player.goals}</td>
                                <td>{player.assists}</td>
                                <td>{player.yellowCards}</td>
                                <td>{player.redCards}</td>
                                <td>{player.gamesPlayed}</td>
                                <td>
                                    {player.injuries
                                        .map(
                                            (injury) =>
                                                `${injury.injuryType}: ${injury.missedGames} missed, ${injury.recovered ? 'recovered' : 'injured'}`
                                        )
                                        .join('; ') || 'None'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="buttons">
                <button onClick={forwards}>Forwards with 10+ Goals</button>
                <button onClick={totalGoals}>Total Goals</button>
                <button onClick={yellowCards}>More Than 3 Yellow Cards</button>
                <button onClick={injured}>Currently Injured</button>
                <button onClick={averageGoals}>Goals per Game</button>
                <button onClick={mostMissed}>Most Missed Games</button>
                <button onClick={midfielders}>Midfielders with 5+ Assists and No Red Cards</button>
                <button onClick={totalMissed}>Total Missed Games</button>
            </div>
            <pre role="status">{result}</pre>
        </section>
    );
}
export default Football;

const team = [
    {
        id: 1,
        name: 'John Smith',
        position: 'forward',
        goals: 12,
        assists: 5,
        yellowCards: 3,
        redCards: 1,
        gamesPlayed: 20,
        injuries: [
            {
                injuryType: 'knee',
                missedGames: 2,
                recovered: true
            }
        ]
    },
    {
        id: 2,
        name: 'Michael Doe',
        position: 'midfielder',
        goals: 5,
        assists: 10,
        yellowCards: 4,
        redCards: 0,
        gamesPlayed: 18,
        injuries: []
    },
    {
        id: 3,
        name: 'Alex Brown',
        position: 'defender',
        goals: 1,
        assists: 2,
        yellowCards: 5,
        redCards: 1,
        gamesPlayed: 17,
        injuries: [
            {
                injuryType: 'muscle',
                missedGames: 5,
                recovered: false
            }
        ]
    }
];
export default team;

const library = [
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genres: ['Fiction', 'Classics'],
        copies: [
            {
                id: 101,
                isAvailable: false
            },
            {
                id: 102,
                isAvailable: true
            }
        ],
        borrowedHistory: [
            {
                userId: 1,
                dateBorrowed: '2023-09-01',
                dateReturned: '2023-09-20'
            },
            {
                userId: 2,
                dateBorrowed: '2023-09-25',
                dateReturned: null
            }
        ]
    },
    {
        id: 2,
        title: '1984',
        author: 'George Orwell',
        genres: ['Fiction', 'Dystopian'],
        copies: [
            {
                id: 201,
                isAvailable: true
            }
        ],
        borrowedHistory: []
    },
    {
        id: 3,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genres: ['Fiction', 'Classics'],
        copies: [
            {
                id: 301,
                isAvailable: false
            }
        ],
        borrowedHistory: [
            {
                userId: 3,
                dateBorrowed: '2023-09-15',
                dateReturned: null
            }
        ]
    }
];
export default library;

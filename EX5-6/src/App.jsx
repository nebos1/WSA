import Header from './Header.jsx';
import Tasks from './Tasks.jsx';
function App() {
    const todoTasks = [
        { id: 1, description: 'Read the React lesson', completed: false },
        { id: 2, description: 'Create the Tasks component', completed: false },
        { id: 3, description: 'Practice passing props', completed: false }
    ];
    const completedTasks = [
        { id: 4, description: 'Create the Vite project', completed: true },
        { id: 5, description: 'Add the Header component', completed: true }
    ];
    return (
        <>
            <Header />
            <main>
                <Tasks tasks={todoTasks} title="Tasks to Do" />
                <Tasks tasks={completedTasks} title="Completed Tasks" />
            </main>
        </>
    );
}
export default App;

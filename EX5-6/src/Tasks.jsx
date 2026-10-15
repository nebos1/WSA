import imgTodo from './assets/todo.svg';
import imgCompleted from './assets/completed.svg';
import './Tasks.css';
function Tasks({ tasks, title }) {
    return (
        <section>
            <h2>{title}</h2>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id}>
                        <img
                            src={task.completed ? imgCompleted : imgTodo}
                            height="20"
                            width="20"
                            alt={task.completed ? 'Completed' : 'To do'}
                        />{' '}
                        <span>{task.description}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
export default Tasks;

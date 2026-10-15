import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Calculator from './pages/Calculator.jsx';
import Arrays from './pages/Arrays.jsx';
import Points from './pages/Points.jsx';

function App() {
    return (
        <BrowserRouter>
            <header>
                <h1>Ex 1</h1>
                <nav aria-label="Main navigation">
                    <NavLink to="/" end>
                        Tasks 1 and 2 — Calculator
                    </NavLink>
                    <NavLink to="/arrays">Task 3 — Arrays</NavLink>
                    <NavLink to="/points">Task 4 — Points</NavLink>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Calculator />} />
                    <Route path="/arrays" element={<Arrays />} />
                    <Route path="/points" element={<Points />} />
                    <Route path="*" element={<h2>Page not found.</h2>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;

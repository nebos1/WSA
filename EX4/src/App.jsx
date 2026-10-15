import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Passwords from './pages/Passwords.jsx';
import People from './pages/People.jsx';
function App() {
    return (
        <BrowserRouter>
            <header>
                <h1>Ex 4</h1>
                <nav aria-label="Main navigation">
                    <NavLink to="/" end>
                        Tasks 1 and 2 — Passwords
                    </NavLink>
                    <NavLink to="/people">Fetch and Arrays — People</NavLink>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Passwords />} />
                    <Route path="/people" element={<People />} />
                    <Route path="*" element={<h2>Page not found.</h2>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}
export default App;

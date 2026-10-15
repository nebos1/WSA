import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import People from './pages/People.jsx';
import Football from './pages/Football.jsx';
import Library from './pages/Library.jsx';
function App() {
    return (
        <BrowserRouter>
            <header>
                <h1>Ex 2</h1>
                <nav aria-label="Main navigation">
                    <NavLink to="/" end>
                        Tasks 1 and 2 — People
                    </NavLink>
                    <NavLink to="/football">Task 3 — Football</NavLink>
                    <NavLink to="/library">Task 4 — Library</NavLink>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<People />} />
                    <Route path="/football" element={<Football />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="*" element={<h2>Page not found.</h2>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}
export default App;

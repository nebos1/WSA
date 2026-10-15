import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './Shop.jsx';
import Basket from './Basket.jsx';
import Menu from './Menu.jsx';
function App() {
    const [cart, updateCart] = useState([]);
    return (
        <BrowserRouter>
            <header>
                <h1>Ex 7 — Web Shop</h1>
                <Menu />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Shop cart={cart} updateCart={updateCart} />} />
                    <Route path="/basket" element={<Basket cart={cart} updateCart={updateCart} />} />
                    <Route path="*" element={<h2>Page not found.</h2>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}
export default App;

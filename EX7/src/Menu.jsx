import { NavLink } from 'react-router-dom';
function Menu() {
    return (
        <nav aria-label="Main navigation">
            <NavLink to="/" end>
                Shop
            </NavLink>
            <NavLink to="/basket">Basket</NavLink>
        </nav>
    );
}
export default Menu;

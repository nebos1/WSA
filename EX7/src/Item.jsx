import tshirt from './assets/tshirt.svg';
import sweatshirt from './assets/sweatshirt.svg';
import cap from './assets/cap.svg';
function Item({ itemData, updateCart }) {
    const images = { 'tshirt.svg': tshirt, 'sweatshirt.svg': sweatshirt, 'cap.svg': cap };
    function addToCart() {
        updateCart((currentCart) => {
            const existing = currentCart.find((item) => item.id === itemData.id);
            if (existing) {
                return currentCart.map((item) =>
                    item.id === itemData.id ? { id: item.id, name: item.name, price: item.price, img: item.img, count: item.count + 1 } : item
                );
            }
            const newCart = currentCart.slice();
            newCart.push({
                id: itemData.id,
                name: itemData.name,
                price: itemData.price,
                img: itemData.img,
                count: 1
            });
            return newCart;
        });
    }
    return (
        <article>
            <img src={images[itemData.img]} alt={itemData.name} width="120" height="110" />
            <h2>{itemData.name}</h2>
            <p>Price: {Number(itemData.price).toFixed(2)} EUR</p>
            <button onClick={addToCart}>Add to Basket</button>
        </article>
    );
}
export default Item;

function Basket({ cart, updateCart }) {
    function changeCount(id, value) {
        const count = Number(value);
        if (!Number.isInteger(count) || count < 1) {
            return;
        }
        updateCart(cart.map((item) => (item.id === id ? { id: item.id, name: item.name, price: item.price, img: item.img, count: count } : item)));
    }

    function removeItem(id) {
        updateCart(cart.filter((item) => item.id !== id));
    }

    let total = 0;
    for (const item of cart) {
        total += Number(item.price) * item.count;
    }
    
    return (
        <section>
            <h2>Basket</h2>
            {cart.length === 0 && <p>Your basket is empty.</p>}
            {cart.map((item) => (
                <article key={item.id}>
                    <h3>{item.name}</h3>
                    <p>Unit price: {Number(item.price).toFixed(2)} EUR</p>
                    <label htmlFor={`count-${item.id}`}>Quantity</label>
                    <input
                        id={`count-${item.id}`}
                        type="number"
                        min="1"
                        step="1"
                        value={item.count}
                        onChange={(event) => changeCount(item.id, event.target.value)}
                    />
                    <p>Subtotal: {(Number(item.price) * item.count).toFixed(2)} EUR</p>
                    <button onClick={() => removeItem(item.id)}>Remove Item</button>
                </article>
            ))}
            <p>Total: {total.toFixed(2)} EUR</p>
        </section>
    );
}
export default Basket;

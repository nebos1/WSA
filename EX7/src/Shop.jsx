import { useEffect, useState } from 'react';
import Item from './Item.jsx';
function Shop({ cart, updateCart }) {
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('Loading products...');
    const [reload, setReload] = useState(0);
    useEffect(() => {
        const controller = new AbortController();
        async function loadItems() {
            setMessage('Loading products...');
            try {
                const response = await fetch('http://localhost:8000/items/', { signal: controller.signal });
                if (!response.ok) {
                    throw new Error('Could not load products.');
                }
                const data = await response.json();
                setItems(data);
                setMessage(data.length ? '' : 'No products found.');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setMessage('Could not load products. Start the API with npm run server, then retry.');
                }
            }
        }
        loadItems();
        return () => controller.abort();
    }, [reload]);
    let count = 0;
    for (const item of cart) {
        count += item.count;
    }
    return (
        <section>
            <h2>Shop</h2>
            <p>Items in basket: {count}</p>
            <p role="status">{message}</p>
            {message.startsWith('Could not') && <button onClick={() => setReload(reload + 1)}>Retry</button>}
            {items.map((item) => (
                <Item key={item.id} itemData={item} cart={cart} updateCart={updateCart} />
            ))}
        </section>
    );
}
export default Shop;

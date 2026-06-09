import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EcommercePage() {
    const navigate = useNavigate();

    const [activePage, setActivePage] = useState("home");
    const [cartItems, setCartItems] = useState([]);
    const [addedItemId, setAddedItemId] = useState(null);

    const products = [
        {
            id: 1,
            name: "Laptop",
            price: 50000,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        },
        {
            id: 2,
            name: "Mobile",
            price: 20000,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        },
        {
            id: 3,
            name: "Headphones",
            price: 3000,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        },
        {
            id: 4,
            name: "Keyboard",
            price: 1500,
            image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        },
        {
            id: 5,
            name: "Smart Watch",
            price: 4999,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        },
        {
            id: 6,
            name: "Camera",
            price: 35000,
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
        },
    ];

    const addToCart = (product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }

        setAddedItemId(product.id);

        setTimeout(() => {
            setAddedItemId(null);
        }, 2000);
    };

    const increaseQty = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCartItems(
            cartItems
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="ecommerce-page">
            <div className="ecom-navbar">
                <h2>ShopEasy</h2>

                <div>
                    <button onClick={() => setActivePage("home")}>Home</button>
                    <button onClick={() => setActivePage("products")}>Products</button>
                    <button onClick={() => setActivePage("cart")}>
                        Cart ({totalItems})
                    </button>
                </div>
            </div>

            {activePage === "home" && (
                <div className="ecom-hero">
                    <h1>Welcome to ShopEasy</h1>
                    <p>Buy latest electronics, gadgets and accessories.</p>

                    <button onClick={() => setActivePage("products")}>
                        Shop Now
                    </button>
                </div>
            )}

            {activePage === "products" && (
                <div className="ecom-section">
                    <h1>Our Products</h1>

                    <div className="ecom-products">
                        {products.map((product) => (
                            <div className="ecom-card" key={product.id}>
                                <img src={product.image} alt={product.name} />

                                <h3>{product.name}</h3>
                                <p>₹{product.price}</p>

                                <button onClick={() => addToCart(product)}>
                                    Add to Cart
                                </button>

                                {addedItemId === product.id && (
                                    <p className="added-msg">✅ Added successfully!</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activePage === "cart" && (
                <div className="ecom-section">
                    <h1>Your Cart</h1>

                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <h2>Your cart is empty</h2>
                            <button onClick={() => setActivePage("products")}>
                                Go to Products
                            </button>
                        </div>
                    ) : (
                        <div className="ecom-cart-layout">
                            <div>
                                {cartItems.map((item) => (
                                    <div className="ecom-cart-item" key={item.id}>
                                        <div>
                                            <h3>{item.name}</h3>
                                            <p>₹{item.price}</p>
                                        </div>

                                        <div className="qty-box">
                                            <button onClick={() => decreaseQty(item.id)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => increaseQty(item.id)}>+</button>
                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="ecom-summary">
                                <h2>Cart Summary</h2>

                                <p>
                                    <span>Total Items</span>
                                    <span>{totalItems}</span>
                                </p>

                                <p>
                                    <span>Total Amount</span>
                                    <span>₹{totalAmount}</span>
                                </p>

                                <button onClick={() => navigate("/ecommerce-payment")}>
                                    Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default EcommercePage;
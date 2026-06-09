import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { CartContext } from "../context/CartContext";

function FoodPage() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("menu");
  const [foods, setFoods] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [addedItemId, setAddedItemId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    cartItems,
    addToCart,
    removeItem,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useContext(CartContext);

  const restaurants = [
    { id: 1, name: "Pizza Hub", rating: 4.5, time: "25 mins", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b" },
    { id: 2, name: "Burger House", rating: 4.3, time: "20 mins", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9" },
    { id: 3, name: "Biryani King", rating: 4.7, time: "35 mins", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0" },
    { id: 4, name: "Italian Cafe", rating: 4.2, time: "30 mins", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" },
  ];

  const staticFoods = [
    { id: 1, name: "Margherita Pizza", category: "Pizza", price: 299, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
    { id: 2, name: "Cheese Burger", category: "Burger", price: 149, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
    { id: 3, name: "Chicken Biryani", category: "Biryani", price: 249, image: "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd" },
    { id: 4, name: "White Sauce Pasta", category: "Pasta", price: 199, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9" },
    { id: 5, name: "Club Sandwich", category: "Snacks", price: 129, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af" },
    { id: 6, name: "French Fries", category: "Snacks", price: 99, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877" },
    { id: 7, name: "Paneer Pizza", category: "Pizza", price: 349, image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65" },
    { id: 8, name: "Veg Biryani", category: "Biryani", price: 199, image: "https://images.unsplash.com/photo-1631515242808-497c3fbd3972" },
    { id: 9, name: "Cold Coffee", category: "Drinks", price: 89, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735" },
    { id: 10, name: "Chocolate Shake", category: "Drinks", price: 119, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699" },
    { id: 11, name: "Veg Momos", category: "Snacks", price: 99, image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9" },
    { id: 12, name: "Noodles", category: "Chinese", price: 159, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841" },
    { id: 13, name: "Manchurian", category: "Chinese", price: 169, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e" },
    { id: 14, name: "Masala Dosa", category: "South Indian", price: 129, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976" },
    { id: 15, name: "Idli Sambar", category: "South Indian", price: 99, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc" },
    { id: 16, name: "Paneer Tikka", category: "Starter", price: 229, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8" },
    { id: 17, name: "Gulab Jamun", category: "Dessert", price: 79, image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d" },
    { id: 18, name: "Ice Cream", category: "Dessert", price: 99, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a" },
  ];

  useEffect(() => {
    getFoodsFromApi();
  }, []);

  const getFoodsFromApi = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get("https://fakestoreapi.com/products?limit=6");

      const apiFoods = response.data.map((item) => ({
        id: item.id + 100,
        name: item.title,
        category: "API Items",
        price: Math.round(item.price * 80),
        image: item.image,
      }));

      setFoods([...staticFoods, ...apiFoods]);
    } catch (err) {
      setError("API failed. Showing default menu items.");
      setFoods(staticFoods);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (food) => {
    addToCart(food);
    setOrderPlaced(false);
    setAddedItemId(food.id);

    setTimeout(() => {
      setAddedItemId(null);
    }, 2000);
  };

  const handleClearCart = () => {
    clearCart();
    setOrderPlaced(false);
  };

  const categories = ["All", ...new Set(foods.map((food) => food.category))];

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = cartItems.length > 0 ? 40 : 0;
  const gst = Math.round(subtotal * 0.05);
  const discount = subtotal > 500 ? 50 : 0;
  const totalBill = subtotal + deliveryCharge + gst - discount;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const checkout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    navigate("/food-payment");
  };

  return (
    <div className="food-page">
      <div className="food-hero">
        <h1>Delicious Food Delivered Fast</h1>
        <p>Order from top restaurants near you</p>

        <div className="food-hero-stats">
          <div>
            <h3>{foods.length}+</h3>
            <p>Menu Items</p>
          </div>

          <div>
            <h3>4.7⭐</h3>
            <p>Top Rated</p>
          </div>

          <div>
            <h3>25 min</h3>
            <p>Avg Delivery</p>
          </div>
        </div>
      </div>

      <div className="food-navbar">
        <h2>Food Delivery</h2>

        <div>
          <button onClick={() => setActiveSection("menu")}>Menu</button>
          <button onClick={() => setActiveSection("restaurants")}>
            Restaurants
          </button>
          <button onClick={() => setActiveSection("cart")}>
            Cart ({totalItems})
          </button>
        </div>
      </div>

      {activeSection === "menu" && (
        <div className="menu-section">
          <h1>Popular Menu</h1>

          {loading && <h2>Loading menu items...</h2>}
          {error && <p className="api-error">{error}</p>}

          <div className="food-controls">
            <input
              type="text"
              placeholder="Search food..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    selectedCategory === category ? "category-active" : ""
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <p className="result-count">
            Showing {filteredFoods.length} food items
          </p>

          <div className="food-container">
            {filteredFoods.length === 0 ? (
              <div className="empty-cart">
                <h2>No food found</h2>
                <button
                  onClick={() => {
                    setSearchText("");
                    setSelectedCategory("All");
                  }}
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              filteredFoods.map((food) => (
                <div className="food-card" key={food.id}>
                  <img src={food.image} alt={food.name} />

                  <div className="food-card-content">
                    <span>{food.category}</span>
                    <h3>{food.name}</h3>
                    <h4>₹{food.price}</h4>

                    <button onClick={() => handleAddToCart(food)}>
                      Add to Cart
                    </button>

                    {addedItemId === food.id && (
                      <p className="added-msg">✅ Added successfully!</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeSection === "restaurants" && (
        <div className="restaurant-section">
          <h1>Top Restaurants</h1>

          <div className="restaurant-container">
            {restaurants.map((restaurant) => (
              <div className="restaurant-card" key={restaurant.id}>
                <img src={restaurant.image} alt={restaurant.name} />

                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>
                  <p>⭐ {restaurant.rating} • {restaurant.time}</p>

                  <button onClick={() => setActiveSection("menu")}>
                    View Menu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "cart" && (
        <div className="cart-section">
          <h1>Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
              <button onClick={() => setActiveSection("menu")}>
                Go to Menu
              </button>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-list">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div>
                      <h3>{item.name}</h3>
                      <p>
                        ₹{item.price} x {item.quantity}
                      </p>
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

                <button className="clear-cart-btn" onClick={handleClearCart}>
                  Clear Cart
                </button>
              </div>

              <div className="checkout-box">
                <h2>Bill Details</h2>

                <p>
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </p>

                <p>
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </p>

                <p>
                  <span>Delivery</span>
                  <span>₹{deliveryCharge}</span>
                </p>

                <p>
                  <span>GST 5%</span>
                  <span>₹{gst}</span>
                </p>

                <p>
                  <span>Discount</span>
                  <span>- ₹{discount}</span>
                </p>

                <hr />

                <h3>
                  <span>Total</span>
                  <span>₹{totalBill}</span>
                </h3>

                <button onClick={checkout}>Checkout</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FoodPage;
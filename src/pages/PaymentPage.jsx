import { useState } from "react";

function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [orderPlaced, setOrderPlaced] = useState(false);

    const cartItems = [
        { id: 1, name: "Margherita Pizza", price: 299, quantity: 1 },
        { id: 2, name: "Cheese Burger", price: 149, quantity: 2 },
        { id: 3, name: "Cold Coffee", price: 89, quantity: 1 },
    ];

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const deliveryCharge = 40;
    const gst = Math.round(subtotal * 0.05);
    const totalAmount = subtotal + deliveryCharge + gst;

    const placeOrder = () => {
        setOrderPlaced(true);
    };

    return (
        <div className="payment-page">
            <div className="payment-header">
                <h1>E-Commerce Payment Flow</h1>
                <p>Checkout, payment method and order confirmation</p>
            </div>

            <div className="payment-layout">
                <div className="checkout-form">
                    <h2>Delivery Address</h2>

                    <input type="text" placeholder="Full Name" />
                    <input type="text" placeholder="Mobile Number" />
                    <textarea placeholder="Full Address"></textarea>
                    <input type="text" placeholder="City" />
                    <input type="text" placeholder="Pincode" />

                    <h2>Payment Method</h2>

                    <div className="payment-methods">
                        <button
                            className={paymentMethod === "UPI" ? "payment-active" : ""}
                            onClick={() => setPaymentMethod("UPI")}
                        >
                            UPI
                        </button>

                        <button
                            className={paymentMethod === "Card" ? "payment-active" : ""}
                            onClick={() => setPaymentMethod("Card")}
                        >
                            Card
                        </button>

                        <button
                            className={paymentMethod === "COD" ? "payment-active" : ""}
                            onClick={() => setPaymentMethod("COD")}
                        >
                            Cash on Delivery
                        </button>
                    </div>

                    {paymentMethod === "UPI" && (
                        <input type="text" placeholder="Enter UPI ID" />
                    )}

                    {paymentMethod === "Card" && (
                        <>
                            <input type="text" placeholder="Card Number" />
                            <input type="text" placeholder="Expiry Date" />
                            <input type="text" placeholder="CVV" />
                        </>
                    )}

                    {paymentMethod === "COD" && (
                        <p className="cod-note">Pay when your order is delivered.</p>
                    )}

                    <button className="place-order-btn" onClick={placeOrder}>
                        Place Order
                    </button>

                    {orderPlaced && (
                        <div className="order-success">
                            ✅ Order Confirmed Successfully!
                        </div>
                    )}
                </div>

                <div className="order-summary">
                    <h2>Order Summary</h2>

                    {cartItems.map((item) => (
                        <div className="summary-item" key={item.id}>
                            <span>
                                {item.name} x {item.quantity}
                            </span>
                            <span>₹{item.price * item.quantity}</span>
                        </div>
                    ))}

                    <hr />

                    <p>
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </p>

                    <p>
                        <span>Delivery</span>
                        <span>₹{deliveryCharge}</span>
                    </p>

                    <p>
                        <span>GST</span>
                        <span>₹{gst}</span>
                    </p>

                    <h3>
                        <span>Total</span>
                        <span>₹{totalAmount}</span>
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
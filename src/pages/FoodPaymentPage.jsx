import { useState } from "react";

function FoodPaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [orderPlaced, setOrderPlaced] = useState(false);

    return (
        <div className="small-payment-page">
            <div className="small-payment-box food-small-box">
                <h1>Food Checkout</h1>
                <p>Complete your food order</p>

                <input type="text" placeholder="Full Name" />
                <input type="text" placeholder="Mobile Number" />
                <textarea placeholder="Delivery Address"></textarea>

                <h3>Payment Method</h3>

                <div className="small-payment-methods">
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
                        COD
                    </button>
                </div>

                {paymentMethod === "UPI" && (
                    <input type="text" placeholder="Enter UPI ID" />
                )}

                {paymentMethod === "Card" && (
                    <>
                        <input type="text" placeholder="Card Number" />
                        <input type="text" placeholder="CVV" />
                    </>
                )}

                {paymentMethod === "COD" && (
                    <p className="small-note">Pay when food is delivered.</p>
                )}

                <button
                    className="small-order-btn"
                    onClick={() => setOrderPlaced(true)}
                >
                    Place Order
                </button>

                {orderPlaced && (
                    <div className="small-success">
                        ✅ Food order placed successfully!
                    </div>
                )}
            </div>
        </div>
    );
}

export default FoodPaymentPage;
import { useState } from "react";

function EcommercePaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState("Card");
    const [orderPlaced, setOrderPlaced] = useState(false);

    return (
        <div className="small-payment-page">
            <div className="small-payment-box ecommerce-small-box">
                <h1>E-Commerce Checkout</h1>
                <p>Complete your product order</p>

                <input type="text" placeholder="Full Name" />
                <input type="text" placeholder="Mobile Number" />
                <textarea placeholder="Shipping Address"></textarea>
                <input type="text" placeholder="City" />
                <input type="text" placeholder="Pincode" />

                <h3>Payment Method</h3>

                <div className="small-payment-methods">
                    <button
                        className={paymentMethod === "Card" ? "payment-active" : ""}
                        onClick={() => setPaymentMethod("Card")}
                    >
                        Card
                    </button>

                    <button
                        className={paymentMethod === "UPI" ? "payment-active" : ""}
                        onClick={() => setPaymentMethod("UPI")}
                    >
                        UPI
                    </button>

                    <button
                        className={paymentMethod === "COD" ? "payment-active" : ""}
                        onClick={() => setPaymentMethod("COD")}
                    >
                        COD
                    </button>
                </div>

                {paymentMethod === "Card" && (
                    <>
                        <input type="text" placeholder="Card Number" />
                        <input type="text" placeholder="CVV" />
                    </>
                )}

                {paymentMethod === "UPI" && (
                    <input type="text" placeholder="Enter UPI ID" />
                )}

                {paymentMethod === "COD" && (
                    <p className="small-note">Pay when product is delivered.</p>
                )}

                <button
                    className="small-order-btn"
                    onClick={() => setOrderPlaced(true)}
                >
                    Place Order
                </button>

                {orderPlaced && (
                    <div className="small-success">
                        ✅ Product order placed successfully!
                    </div>
                )}
            </div>
        </div>
    );
}

export default EcommercePaymentPage;
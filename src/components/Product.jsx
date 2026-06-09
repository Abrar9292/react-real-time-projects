function Product({ name, price }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>Price: ₹{price}</p>
      <button>View Details</button>
    </div>
  );
}

export default Product;
import { useState } from "react";
import Product from "./Product";

function ProductList() {

  const productsData = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 },
    { id: 4, name: "Keyboard", price: 1500 },
  ];

  const [search, setSearch] = useState("");

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-section">

      <h2>Product Listing</h2>

      <input
        type="text"
        placeholder="Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="product-container">

        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            name={product.name}
            price={product.price}
          />
        ))}

      </div>

    </div>
  );
}

export default ProductList;
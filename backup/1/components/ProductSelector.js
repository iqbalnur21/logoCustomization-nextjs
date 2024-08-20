import React from "react";

const products = [
  {
    id: 1,
    name: "T-Shirt",
    image:
      "https://image-proxy-production.swag.com/convert/swag-prod/5de68d9eaa40fe17c1313118.jpg?format=jpg&height=750",
  },
  {
    id: 2,
    name: "Mug",
    image:
      "https://image-proxy-production.swag.com/convert/swag-prod/657b4c9b08fd105c37f20734.jpg?format=jpg&height=750",
  },
  {
    id: 3,
    name: "Tumbler",
    image:
      "https://image-proxy-production.swag.com/convert/swag-prod/5e189fc9bb6a612ceab96b52.jpg?format=jpg&height=750",
  },
];

const ProductSelector = ({ selectedProduct, onSelect }) => {
  return (
    <div className="product-selector">
      {products.map((product) => (
        <div key={product.id} onClick={() => onSelect(product)}>
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductSelector;

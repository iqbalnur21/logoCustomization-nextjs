"use client";

import React, { useState } from 'react';
import ProductSelector from './ProductSelector';
import LogoEditor from './LogoEditor';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
      <h1>Custom Product Designer</h1>
      <ProductSelector selectedProduct={selectedProduct} onSelect={setSelectedProduct} />
      {selectedProduct && (
        <div>
          <h2>Customize your {selectedProduct.name}</h2>
          <div className="product-preview">
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <LogoEditor />
          </div>
        </div>
      )}
    </div>
  );
}

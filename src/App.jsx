import React, { useState } from 'react';
import { initialProducts } from './initialProducts';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import AddProductForm from './components/AddProductForm';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Category Filter logic
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  // Add to Cart logic
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, cartQuantity: 1 }];
    });
  };

  // Add New Product logic from form
  const handleAddProduct = (newProduct) => {
    setProducts(prev => [...prev, { id: Date.now(), ...newProduct }]);
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">💄 Makeup Product Management App</h1>
      
      {/* Category Filter Buttons */}
      <div className="d-flex justify-content-center gap-2 mb-4">
        {["All", "Lips", "Face", "Eyes"].map(category => (
          <button
            key={category}
            className={`btn ${selectedCategory === category ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="row">
        <div className="col-md-8">
          <AddProductForm onAddProduct={handleAddProduct} />
          <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
        </div>
        <div className="col-md-4">
          <ShoppingCart cart={cart} setCart={setCart} />
        </div>
      </div>
    </div>
  );
}
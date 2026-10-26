import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import AddProductForm from './components/AddProductForm';

const initialProducts = [
  {
    id: 1,
    name: "Matte Velvet Lipstick",
    category: "Lips",
    price: 289.50,
    quantity: 3,
    rating: 4.8,
    image: "https://i.pinimg.com/736x/e6/23/9a/e6239aeaa2b7c08fe1954f2b1db672a2.jpg",
    description: "Long-lasting matte liquid lipstick with a rich, velvety finish.",
    specification: "Shade: Ruby Red, 5ml"
  },
  {
    id: 2,
    name: "Luminous Liquid Foundation",
    category: "Face",
    price: 420.00,
    quantity: 12,
    rating: 4.7,
    image: "https://i.pinimg.com/736x/37/46/00/374600b56d1bb7caa4ebb59a5c3dda9a.jpg",
    description: "Hydrating liquid foundation for a radiant, smooth complexion.",
    specification: "Shade: Natural Beige, 30ml"
  },
  {
    id: 3,
    name: "Nude Eyeshadow Palette",
    category: "Eyes",
    price: 350.00,
    quantity: 8,
    rating: 4.9,
    image: "https://i.pinimg.com/736x/ae/5e/69/ae5e698122bdeeff5a9065cea5a8d669.jpg",
    description: "Versatile palette featuring highly pigmented nude and shimmer shades.",
    specification: "9-Color Palette"
  }
];

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleAddProduct = (newProd) => {
    const productWithId = { ...newProd, id: Date.now() };
    setProducts([productWithId, ...products]);
  };

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, cartQuantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item => (item.id === id ? { ...item, cartQuantity: quantity } : item))
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="container my-4">
      {/* Top Header Bar: Cart Icon aligned to the TOP-RIGHT */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        <ShoppingCart 
          cartItems={cartItems} 
          onUpdateQuantity={handleUpdateQuantity} 
          onRemoveItem={handleRemoveItem} 
        />
      </div>

      {/* Main Title */}
      <h1 className="text-center mb-4 text-dark fw-bold">
        Makeup Product Management App
      </h1>

      {/* Category Filter Buttons */}
      <div className="d-flex justify-content-center gap-2 mb-4">
        {['All', 'Lips', 'Face', 'Eyes'].map(cat => (
          <button
            key={cat}
            className={`btn ${selectedCategory === cat ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Add Product Form Section */}
      <div className="row justify-content-center mb-4">
        <div className="col-lg-8">
          <AddProductForm onAddProduct={handleAddProduct} />
        </div>
      </div>

      {/* Product List Below */}
      <div className="mt-4">
        <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
}
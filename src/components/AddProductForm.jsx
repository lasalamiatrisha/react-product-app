import React, { useState } from 'react';

export default function AddProductForm({ onAddProduct }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Lips');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !quantity || !description) {
      alert("Please fill in all required fields!");
      return;
    }

    onAddProduct({
      name,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      image: '/lipstick.png', // Default image fallback
      description,
      specification: "Newly added item",
      rating: 5.0
    });

    setName('');
    setPrice('');
    setQuantity('');
    setDescription('');
  };

  return (
    <div className="card shadow-sm p-3 mb-4">
      <h5>➕ Add New Makeup Product</h5>
      <form onSubmit={handleSubmit} className="row g-2">
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="col-md-6">
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="Lips">Lips</option>
            <option value="Face">Face</option>
            <option value="Eyes">Eyes</option>
          </select>
        </div>
        <div className="col-md-6">
          <input type="number" className="form-control" placeholder="Price (₱)" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div className="col-md-6">
          <input type="number" className="form-control" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
        </div>
        <div className="col-12">
          <input type="text" className="form-control" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success w-100">Add Product</button>
        </div>
      </form>
    </div>
  );
}
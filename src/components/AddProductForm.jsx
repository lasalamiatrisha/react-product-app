import React, { useState } from 'react';

export default function AddProductForm({ onAddProduct }) {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Lips');
  const [description, setDescription] = useState('');
  const [specification, setSpecification] = useState('');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!image || !name || !category || !description || !specification || !rating || !price || !quantity) {
      alert("Please fill in all required fields!");
      return;
    }

    onAddProduct({
      image,
      name,
      category,
      description,
      specification,
      rating: parseFloat(rating),
      price: parseFloat(price),
      quantity: parseInt(quantity)
    });

    // Reset form fields
    setImage('');
    setName('');
    setCategory('Lips');
    setDescription('');
    setSpecification('');
    setRating('');
    setPrice('');
    setQuantity('');
  };

  return (
    <div className="card shadow-sm p-3 mb-4">
      <h5>➕ Add New Makeup Product</h5>
      <form onSubmit={handleSubmit} className="row g-2">
        {/* Form fields for product details */}
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
        </div>
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
          <input type="number" step="0.1" max="5" className="form-control" placeholder="Rating (e.g. 4.8)" value={rating} onChange={e => setRating(e.target.value)} />
        </div>
        <div className="col-md-6">
          <input type="number" step="0.01" className="form-control" placeholder="Price (₱)" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div className="col-md-6">
          <input type="number" className="form-control" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
        </div>
        <div className="col-12">
          <input type="text" className="form-control" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="col-12">
          <input type="text" className="form-control" placeholder="Specification (e.g. Shade: Ruby Red, 5ml)" value={specification} onChange={e => setSpecification(e.target.value)} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success w-100">Add Product</button>
        </div>
      </form>
    </div>
  );
}
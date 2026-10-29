import React, { useState } from 'react';

export default function AddProductForm({ onAddProduct }) {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Lips');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [specification, setSpecification] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !quantity) return;

    onAddProduct({
      image: image || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80',
      name,
      category,
      rating: parseFloat(rating) || 4.5,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description: description || 'No description provided.',
      specification: specification || 'Standard specification'
    });

    // Reset form & close modal
    setImage('');
    setName('');
    setCategory('Lips');
    setRating('');
    setPrice('');
    setQuantity('');
    setDescription('');
    setSpecification('');
    setIsOpen(false);
  };

  return (
    <div className="text-center mb-4">
      {/* Clickable Button to Open Add Product Modal */}
      <button 
        className="btn btn-dark px-4 py-2 shadow-sm fw-bold"
        onClick={() => setIsOpen(true)}
      >
        ➕ Add New Makeup Product
      </button>

      {/* Pop-out Modal */}
      {isOpen && (
        <div 
          className="modal show d-block text-start" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(3px)', zIndex: 1050 }}
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content shadow-lg border-0" style={{ borderRadius: '16px' }}>
              
              {/* Modal Header */}
              <div className="modal-header bg-dark text-white rounded-top" style={{ borderRadius: '16px 16px 0 0' }}>
                <h5 className="modal-title fw-bold text-white">✨ Add New Makeup Product</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setIsOpen(false)}
                ></button>
              </div>

              {/* Modal Body / Form */}
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Image URL</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Paste image link here" 
                        value={image} 
                        onChange={(e) => setImage(e.target.value)} 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Product Name *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Matte Lipstick" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Category</label>
                      <select 
                        className="form-select" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="Lips">Lips</option>
                        <option value="Face">Face</option>
                        <option value="Eyes">Eyes</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Rating (e.g. 4.8)</label>
                      <input 
                        type="number" 
                        step="0.1" 
                        max="5" 
                        min="0" 
                        className="form-control" 
                        placeholder="4.8" 
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)} 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Price (₱) *</label>
                      <input 
                        type="number" 
                        step="0.01" 
                        className="form-control" 
                        placeholder="299.00" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Quantity *</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        placeholder="10" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">Description</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Short product description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">Specification (e.g. Shade: Ruby Red, 5ml)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Shade, volume, or size details" 
                        value={specification} 
                        onChange={(e) => setSpecification(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="modal-footer bg-light rounded-bottom" style={{ borderRadius: '0 0 16px 16px' }}>
                  <button 
                    type="button" 
                    className="btn btn-secondary w-25" 
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-success w-50 fw-bold"
                  >
                    Add Product
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
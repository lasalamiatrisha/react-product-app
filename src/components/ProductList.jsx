import React, { useState } from 'react';

export default function ProductList({ products, onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-3" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img 
                src={product.image} 
                className="card-img-top p-2" 
                alt={product.name} 
                style={{ height: '200px', objectFit: 'contain' }} 
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="text-muted small mb-1">Category: {product.category}</p>
                
                {/* Low Stock Alert Trigger (< 5) */}
                {product.quantity < 5 ? (
                  <span className="badge bg-danger mb-2">⚠️ Low Stock: Only {product.quantity} left!</span>
                ) : (
                  <span className="badge bg-success mb-2">In Stock: {product.quantity}</span>
                )}

                <div className="mt-auto">
                  <span className="fw-bold fs-5 d-block mb-2">₱{product.price.toFixed(2)}</span>
                  
                  {/* Buttons for Details and Add to Cart */}
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-outline-secondary btn-sm w-50"
                      onClick={() => setSelectedProduct(product)}
                    >
                      View Details
                    </button>
                    <button 
                      className="btn btn-primary btn-sm w-50"
                      onClick={() => onAddToCart(product)}
                      disabled={product.quantity === 0}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dedicated Product Details Modal */}
      {selectedProduct && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.name}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedProduct(null)}></button>
              </div>
              <div className="modal-body text-center">
                <img src={selectedProduct.image} alt={selectedProduct.name} style={{ height: '180px', objectFit: 'contain' }} className="mb-3" />
                <p><strong>Category:</strong> {selectedProduct.category}</p>
                <p><strong>Description:</strong> {selectedProduct.description}</p>
                <p><strong>Specification:</strong> {selectedProduct.specification}</p>
                <p><strong>Rating:</strong> ⭐ {selectedProduct.rating} / 5.0</p>
                <p className="fs-4 text-success fw-bold">₱{selectedProduct.price.toFixed(2)}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedProduct(null)}>Close</button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={() => {
                    onAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
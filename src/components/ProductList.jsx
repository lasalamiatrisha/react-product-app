import React from 'react';

export default function ProductList({ products, onAddToCart }) {
  return (
    <div className="row">
      {products.map(product => (
        <div className="col-md-4 mb-3" key={product.id}>
          <div className="card h-100 shadow-sm">
            <img src={product.image} className="card-img-top p-2" alt={product.name} style={{ height: '200px', objectFit: 'contain' }} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{product.name}</h5>
              <p className="text-muted small mb-1">Category: {product.category}</p>
              <p className="card-text">{product.description}</p>
              <p className="small text-secondary fw-bold">{product.specification}</p>
              
              {/* Low Stock Alert Trigger (< 5) */}
              {product.quantity < 5 ? (
                <span className="badge bg-danger mb-2">⚠️ Low Stock: Only {product.quantity} left!</span>
              ) : (
                <span className="badge bg-success mb-2">In Stock: {product.quantity}</span>
              )}

              <div className="mt-auto d-flex justify-content-between align-items-center">
                <span className="fw-bold fs-5">₱{product.price.toFixed(2)}</span>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => onAddToCart(product)}
                  disabled={product.quantity === 0}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
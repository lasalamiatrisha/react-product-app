import React, { useState } from 'react';

export default function ShoppingCart({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = cartItems ? cartItems.reduce((sum, item) => sum + item.price * item.cartQuantity, 0) : 0;
  const shippingFee = cartItems && cartItems.length > 0 ? 50 : 0;
  const grandTotal = subtotal + shippingFee;
  const totalItemCount = cartItems ? cartItems.reduce((sum, item) => sum + item.cartQuantity, 0) : 0;

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    if (onClearCart) {
      onClearCart();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCheckoutSuccess(false);
  };

  return (
    <>
      {/* Top Clickable Cart Icon Button */}
      <button 
        className="btn btn-dark d-flex align-items-center gap-2 px-3 py-2 shadow-sm"
        onClick={() => setIsOpen(true)}
        title="View Cart"
      >
        <span style={{ fontSize: '1.2rem' }}>🛒</span>
        <span className="fw-semibold">Cart</span>
        <span className="badge bg-light text-dark rounded-pill ms-1">{totalItemCount}</span>
      </button>

      {/* Pop-out Details Modal */}
      {isOpen && (
        <div 
          className="modal show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(3px)', zIndex: 1050 }}
          onClick={handleCloseModal}
        >
          <div 
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content shadow-lg border-0" style={{ borderRadius: '16px' }}>
              
              <div className="modal-header bg-dark text-white rounded-top" style={{ borderRadius: '16px 16px 0 0' }}>
                <h5 className="modal-title fw-bold text-white">🛍️ Added Cart Items</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={handleCloseModal}
                ></button>
              </div>

              <div className="modal-body p-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {checkoutSuccess ? (
                  <div className="text-center py-5">
                    <h3 className="text-success fw-bold mb-3">🎉 Order Placed Successfully!</h3>
                    <p className="text-muted fs-5">Thank you for your purchase. Your order has been checked out.</p>
                  </div>
                ) : (!cartItems || cartItems.length === 0) ? (
                  <div className="text-center py-4">
                    <p className="text-muted fs-5 mb-0">Your cart is currently empty.</p>
                  </div>
                ) : (
                  <div className="list-group list-group-flush">
                    {cartItems.map(item => (
                      <div key={item.id} className="list-group-item d-flex align-items-center justify-content-between py-3 border-bottom">
                        <div className="d-flex align-items-center gap-3">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '8px' }} 
                          />
                          <div>
                            <h6 className="mb-0 fw-bold">{item.name}</h6>
                            <small className="text-muted">₱{item.price.toFixed(2)} each</small>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          <button 
                            className="btn btn-sm btn-outline-secondary px-2"
                            onClick={() => onUpdateQuantity(item.id, item.cartQuantity - 1)}
                          >-</button>
                          <span className="fw-bold px-2">{item.cartQuantity}</span>
                          <button 
                            className="btn btn-sm btn-outline-secondary px-2"
                            onClick={() => onUpdateQuantity(item.id, item.cartQuantity + 1)}
                          >+</button>
                          
                          <span className="fw-bold ms-3" style={{ minWidth: '80px', textAlign: 'right' }}>
                            ₱{(item.price * item.cartQuantity).toFixed(2)}
                          </span>

                          <button 
                            className="btn btn-sm btn-outline-danger ms-2"
                            onClick={() => onRemoveItem(item.id)}
                            title="Remove item"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {checkoutSuccess ? (
                <div className="modal-footer bg-light rounded-bottom justify-content-center" style={{ borderRadius: '0 0 16px 16px' }}>
                  <button 
                    type="button" 
                    className="btn btn-dark px-5 fw-bold" 
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              ) : (
                cartItems && cartItems.length > 0 && (
                  <div className="modal-footer d-flex flex-column bg-light rounded-bottom" style={{ borderRadius: '0 0 16px 16px' }}>
                    <div className="w-100 d-flex justify-content-between mb-1">
                      <span className="text-muted">Subtotal:</span>
                      <span className="fw-semibold">₱{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="w-100 d-flex justify-content-between mb-2">
                      <span className="text-muted">Shipping Fee:</span>
                      <span className="fw-semibold">₱{shippingFee.toFixed(2)}</span>
                    </div>
                    <div className="w-100 d-flex justify-content-between border-top pt-2">
                      <span className="fs-5 fw-bold">Total:</span>
                      <span className="fs-5 fw-bold text-dark">₱{grandTotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="w-100 d-flex gap-2 mt-3">
                      <button 
                        type="button" 
                        className="btn btn-secondary w-50" 
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-dark w-50 fw-bold"
                        onClick={handleCheckout}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                )
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
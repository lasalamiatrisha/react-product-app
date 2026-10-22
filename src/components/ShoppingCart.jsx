import React from 'react';

export default function ShoppingCart({ cart, setCart }) {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
  const shipping = cart.length > 0 ? 50.00 : 0;
  const grandTotal = subtotal + shipping;

  const handleQuantityChange = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.cartQuantity + delta;
        return newQty > 0 ? { ...item, cartQuantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  return (
    <div className="card shadow-sm p-3">
      <h4>🛒 Shopping Cart</h4>
      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group list-group-flush mb-3">
            {cart.map(item => (
              <li className="list-group-item d-flex justify-content-between align-items-center px-0" key={item.id}>
                <div>
                  <h6 className="mb-0">{item.name}</h6>
                  <small className="text-muted">₱{item.price} x {item.cartQuantity}</small>
                </div>
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <button className="btn btn-outline-secondary" disabled>{item.cartQuantity}</button>
                  <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-top pt-2">
            <div className="d-flex justify-content-between"><span>Subtotal:</span><span>₱{subtotal.toFixed(2)}</span></div>
            <div className="d-flex justify-content-between"><span>Shipping:</span><span>₱{shipping.toFixed(2)}</span></div>
            <div className="d-flex justify-content-between fw-bold fs-5 mt-2"><span>Total:</span><span>₱{grandTotal.toFixed(2)}</span></div>
          </div>
        </>
      )}
    </div>
  );
}
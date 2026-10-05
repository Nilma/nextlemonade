'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useCart } from './CartProvider';

export default function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const [complete, setComplete] = useState(false);

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearCart();
    setComplete(true);
  }

  if (complete) {
    return (
      <section className="panel empty-state">
        <div className="success-icon">✓</div>
        <h1>Order placed!</h1>
        <p>Your lemonade stand order has been received.</p>
        <Link className="button-link" href="/shop">Continue shopping</Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="panel empty-state">
        <h1>Nothing to checkout</h1>
        <p>Add drinks to your cart before checking out.</p>
        <Link className="button-link" href="/shop">Go to Shop</Link>
      </section>
    );
  }

  return (
    <>
      <section className="page-heading">
        <span className="badge">Checkout</span>
        <h1>Complete your order</h1>
      </section>
      <div className="checkout-layout">
        <form className="panel checkout-form" onSubmit={submitOrder}>
          <h2>Customer details</h2>
          <label>Full name<input name="name" required placeholder="Alex Lemon" /></label>
          <label>Email<input name="email" type="email" required placeholder="alex@example.com" /></label>
          <label>Address<input name="address" required placeholder="Lemon Street 5" /></label>
          <div className="form-row">
            <label>City<input name="city" required placeholder="Copenhagen" /></label>
            <label>Postal code<input name="postal" required placeholder="1000" /></label>
          </div>
          <button type="submit">Place order · ${total.toFixed(2)}</button>
          <p className="helper-text">Demo checkout only — no payment is processed.</p>
        </form>
        <aside className="panel order-summary">
          <h2>Your order</h2>
          {items.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>{item.quantity} × {item.name}</span>
              <strong>${(item.quantity * item.price).toFixed(2)}</strong>
            </div>
          ))}
          <div className="summary-row total-row"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
        </aside>
      </div>
    </>
  );
}

'use client';

import Link from 'next/link';
import { useCart } from './CartProvider';

export default function CartView() {
  const { items, total, increase, decrease, remove } = useCart();

  if (items.length === 0) {
    return (
      <section className="panel empty-state">
        <h1>Your cart is empty</h1>
        <p>Choose a refreshing drink from the shop.</p>
        <Link className="button-link" href="/shop">Go to Shop</Link>
      </section>
    );
  }

  return (
    <>
      <section className="page-heading">
        <span className="badge">Cart</span>
        <h1>Your drinks</h1>
      </section>
      <section className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} />
              <div className="cart-item-copy">
                <h2>{item.name}</h2>
                <p>${item.price.toFixed(2)} each</p>
                <div className="quantity-controls">
                  <button className="small-button secondary" onClick={() => decrease(item.id)}>-</button>
                  <strong>{item.quantity}</strong>
                  <button className="small-button secondary" onClick={() => increase(item.id)}>+</button>
                  <button className="text-button" onClick={() => remove(item.id)}>Remove</button>
                </div>
              </div>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </article>
          ))}
        </div>
        <aside className="panel order-summary">
          <h2>Order summary</h2>
          <div className="summary-row"><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div>
          <div className="summary-row"><span>Delivery</span><strong>Free</strong></div>
          <div className="summary-row total-row"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
          <Link className="button-link full-width" href="/checkout">Checkout</Link>
        </aside>
      </section>
    </>
  );
}

'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type DeliveryStatus = 'idle' | 'delivering' | 'arrived';

const BUY_PRICE = 2;
const SELL_PRICE = 5;
const DELIVERY_QTY = 5;
const START_CASH = 20;

export default function LemonadeStand() {
  const [lemons, setLemons] = useState(0);
  const [sold, setSold] = useState(0);
  const [cash, setCash] = useState(START_CASH);
  const [cost, setCost] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>('idle');
  const [message, setMessage] = useState<string | null>('Welcome to my bright stand 🍋');

  const profit = revenue - cost;
  const canBuyOne = cash >= BUY_PRICE;
  const canBuyDelivery = cash >= BUY_PRICE * DELIVERY_QTY && deliveryStatus !== 'delivering';
  const canSell = lemons > 0;

  const profitTone = useMemo(() => {
    if (profit > 0) return 'profit-positive';
    if (profit < 0) return 'profit-negative';
    return 'profit-neutral';
  }, [profit]);

  function buyLemon() {
    if (!canBuyOne) {
      setMessage('Not enough cash to buy a lemon.');
      return;
    }

    setLemons((value) => value + 1);
    setCash((value) => value - BUY_PRICE);
    setCost((value) => value + BUY_PRICE);
    setMessage('You bought 1 lemon.');
  }

  function sellLemonade() {
    if (!canSell) {
      setMessage('No lemons in stock to sell.');
      return;
    }

    setLemons((value) => value - 1);
    setSold((value) => value + 1);
    setCash((value) => value + SELL_PRICE);
    setRevenue((value) => value + SELL_PRICE);
    setMessage('A cup of lemonade was sold.');
  }

  function orderDelivery() {
    const total = BUY_PRICE * DELIVERY_QTY;

    if (!canBuyDelivery) {
      setMessage(
        deliveryStatus === 'delivering'
          ? 'A delivery is already on the way.'
          : 'Not enough cash to order delivery.'
      );
      return;
    }

    setCash((value) => value - total);
    setCost((value) => value + total);
    setDeliveryStatus('delivering');
    setMessage('Delivery ordered. 5 lemons will arrive in 1 second.');

    window.setTimeout(() => {
      setLemons((value) => value + DELIVERY_QTY);
      setDeliveryStatus('arrived');
      setMessage('Delivery arrived with 5 fresh lemons.');

      window.setTimeout(() => {
        setDeliveryStatus('idle');
      }, 1200);
    }, 1000);
  }

  function resetStand() {
    setLemons(0);
    setSold(0);
    setCash(START_CASH);
    setCost(0);
    setRevenue(0);
    setDeliveryStatus('idle');
    setMessage('Stand reset. Ready for a new day.');
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="badge">Next.js</span>
          <h1>Lemonade Stand</h1>
          <p>
            A brightful lemonade stand created with Next.js inspired by the original lemonadestand project created with React 19.
          </p>
          <div className="price-row">
            <span>Buy price: ${BUY_PRICE}</span>
            <span>Sell price: ${SELL_PRICE}</span>
          </div>
          <div style={{ marginTop: 18 }}>
            <Link className="button-link" href="/shop">Visit Drink Shop →</Link>
          </div>
        </div>
        <div className="hero-emoji" aria-hidden="true">
          🍋
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="panel">
          <h2>Status</h2>
          <div className="stat-list">
            <Stat label="Lemons in stock" value={lemons} />
            <Stat label="Lemonades sold" value={sold} />
            <Stat label="Cash" value={`$${cash}`} />
            <Stat label="Delivery" value={deliveryStatus} />
          </div>
        </article>

        <article className="panel">
          <h2>Financials</h2>
          <div className="stat-list">
            <Stat label="Revenue" value={`$${revenue}`} />
            <Stat label="Cost" value={`$${cost}`} />
            <Stat label="Profit" value={`$${profit}`} valueClassName={profitTone} />
          </div>
        </article>
      </section>

      <section className="panel">
        <h2>Actions</h2>
        <div className="actions-grid">
          <button onClick={buyLemon} disabled={!canBuyOne}>
            Buy 1 Lemon (${BUY_PRICE})
          </button>
          <button onClick={sellLemonade} disabled={!canSell}>
            Sell 1 Lemonade (${SELL_PRICE})
          </button>
          <button onClick={orderDelivery} disabled={!canBuyDelivery}>
            Order Delivery: {DELIVERY_QTY} Lemons (${BUY_PRICE * DELIVERY_QTY})
          </button>
          <button className="secondary" onClick={resetStand}>
            Reset Stand
          </button>
        </div>
        <p className="helper-text">Delivery arrives after 1 second, just like in the original concept.</p>
      </section>

      <section className="panel message-panel" aria-live="polite">
        <h2>Stand Message</h2>
        <p>{message}</p>
      </section>
    </main>
  );
}

function Stat({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string | number;
  valueClassName?: string;
}) {
  return (
    <div className="stat-item">
      <span>{label}</span>
      <strong className={valueClassName}>{value}</strong>
    </div>
  );
}

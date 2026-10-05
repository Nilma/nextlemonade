import AddToCartButton from '@/components/AddToCartButton';
import { getDrinks } from '@/lib/drinks';

export default async function ShopPage() {
  const drinks = await getDrinks();

  return (
    <main className="page-shell">
      <section className="page-heading">
        <span className="badge">External API</span>
        <h1>Drink Shop</h1>
        <p>Non-alcoholic drinks loaded from TheCocktailDB.</p>
      </section>

      <section className="product-grid">
        {drinks.map((drink) => (
          <article className="product-card" key={drink.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={drink.image} alt={drink.name} />
            <div className="product-copy">
              <div>
                <h2>{drink.name}</h2>
                <p className="product-price">${drink.price.toFixed(2)}</p>
              </div>
              <AddToCartButton drink={drink} />
            </div>
          </article>
        ))}
      </section>
      <p className="api-credit">Drink data and images: TheCocktailDB.</p>
    </main>
  );
}

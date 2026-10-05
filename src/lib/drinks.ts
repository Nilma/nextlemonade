import type { Drink } from './types';

type ApiDrink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

type ApiResponse = {
  drinks: ApiDrink[] | null;
};

const DRINKS_API =
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';

export async function getDrinks(): Promise<Drink[]> {
  const response = await fetch(DRINKS_API, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error('Could not load drinks from TheCocktailDB.');
  }

  const data = (await response.json()) as ApiResponse;

  return (data.drinks ?? []).slice(0, 12).map((drink, index) => ({
    id: drink.idDrink,
    name: drink.strDrink,
    image: drink.strDrinkThumb,
    price: 4 + (index % 5),
  }));
}

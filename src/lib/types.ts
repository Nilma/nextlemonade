export type Drink = {
  id: string;
  name: string;
  image: string;
  price: number;
};

export type CartItem = Drink & {
  quantity: number;
};

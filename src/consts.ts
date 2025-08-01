import cola from "/cola.png";
import water from "/water.png";
import coffee from "/coffee.png";

export const INVENTORY = {
  cola: {
    price: 1_100,
    count: 10,
    imgSrc: cola,
    altText: "A bottle of cola",
  },
  water: {
    price: 600,
    count: 5,
    imgSrc: water,
    altText: "A bottle of water",
  },
  coffee: {
    price: 700,
    count: 1,
    imgSrc: coffee,
    altText: "A cup of coffee",
  },
};
export type InventoryKeys = keyof typeof INVENTORY;

export const CUSTOMER_INVENTORY: Record<InventoryKeys, number> = {
  cola: 0,
  water: 0,
  coffee: 0,
};
export const EMOJIS: Record<InventoryKeys, string> = {
  cola: "\u{1F964}",
  water: "\u{1F4A7}",
  coffee: "\u2615 \uFE0F",
};
export const CASH_DENOMINATIONS = [100, 500, 1_000, 5_000, 10_000];
export const PAYMENT_OPTIONS = ["card", ...CASH_DENOMINATIONS];

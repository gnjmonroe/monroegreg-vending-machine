import { useContext } from "react";
import type { INVENTORY, InventoryKeys } from "../consts";
import { BalanceContext } from "../BalanceContext";
import styles from "./Choices.module.css";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

interface ChoicesProps {
  inventory: typeof INVENTORY;
  decrementInventory: (key: InventoryKeys) => void;
  incrementCustomerInventory: (key: InventoryKeys) => void;
}
export default function Choices({
  inventory,
  decrementInventory,
  incrementCustomerInventory,
}: ChoicesProps) {
  const balance = useContext(BalanceContext);

  return (
    <div className={styles.choicesContainer}>
      {Object.entries(inventory).map(
        ([key, { price, count, imgSrc, altText }]) => {
          const isSoldOut = count === 0;
          const isInsufficientFunds = balance !== "card" && balance < price;

          return (
            <button
              key={key}
              disabled={isSoldOut || isInsufficientFunds}
              onClick={() => {
                decrementInventory(key as InventoryKeys);
                incrementCustomerInventory(key as InventoryKeys);
              }}
              className={styles.choice}
              data-sold-out={isSoldOut}
            >
              <img src={imgSrc} alt={altText} />
              <span className={styles.choiceText}>
                <span>
                  {capitalizeFirstLetter(key)} ({count || "Sold Out"})
                </span>
              </span>
            </button>
          );
        },
      )}
    </div>
  );
}

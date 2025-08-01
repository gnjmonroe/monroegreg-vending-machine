import { useContext } from "react";
import type { INVENTORY, InventoryKeys } from "../consts";
import { BalanceContext } from "../BalanceContext";
import styles from "./Choices.module.css";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { formatKrw } from "../utils/formatKrw";

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
          const quantityString = `(${count || "Sold Out"})`;

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
              data-insufficient-funds={isInsufficientFunds}
            >
              <img src={imgSrc} alt={altText} />
              <span className={styles.choiceSpanContainer}>
                <span>{`${capitalizeFirstLetter(key)} ${quantityString}`}</span>
                <span className={styles.price}>{formatKrw(price)}</span>
                {isInsufficientFunds && (
                  <span className={styles.insufficientFunds}>
                    Insufficient Funds
                  </span>
                )}
              </span>
            </button>
          );
        },
      )}
    </div>
  );
}

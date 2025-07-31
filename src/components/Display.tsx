import { useContext } from "react";
import { EMOJIS, type CUSTOMER_INVENTORY, type InventoryKeys } from "../consts";
import { BalanceContext } from "../BalanceContext";
import styles from "./Display.module.css";
import { formatKrw } from "../utils/formatKrw";

interface DisplayProps {
  customerInventory: typeof CUSTOMER_INVENTORY;
}
export default function Display({ customerInventory }: DisplayProps) {
  const balance = useContext(BalanceContext);

  return (
    <div className={styles.displayContainer}>
      {balance === "card" ? "CARD" : formatKrw(balance)}
      {Object.entries(customerInventory).map(([key, count]) => {
        return (
          <span key={key}>{`${EMOJIS[key as InventoryKeys]}: ${count}`}</span>
        );
      })}
    </div>
  );
}

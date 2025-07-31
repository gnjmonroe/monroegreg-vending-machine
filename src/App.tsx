import { useCallback, useState } from "react";
import styles from "./App.module.css";
import { useImmer } from "use-immer";
import { CUSTOMER_INVENTORY, INVENTORY, type InventoryKeys } from "./consts";
import { BalanceContext, type Balance } from "./BalanceContext";
import Choices from "./components/Choices";
import PaymentOptions from "./components/PaymentOptions";
import Display from "./components/Display";

export default function App() {
  const [inventory, setInventory] = useImmer(INVENTORY);
  const [customerInventory, setCustomerInventory] =
    useImmer(CUSTOMER_INVENTORY);
  const [balance, setBalance] = useState<Balance>(0);

  const decrementInventory = useCallback(
    (key: InventoryKeys) => {
      setInventory((draft) => {
        draft[key].count -= 1;
        if (balance !== "card") {
          setBalance(balance - INVENTORY[key].price);
        }
      });
    },
    [balance],
  );

  const incrementCustomerInventory = useCallback((key: InventoryKeys) => {
    setCustomerInventory((draft) => {
      draft[key] += 1;
    });
  }, []);

  const isUsingCash = balance !== "card" && balance > 0;

  return (
    <div className={styles.root}>
      <BalanceContext value={balance}>
        <Choices
          inventory={inventory}
          decrementInventory={decrementInventory}
          incrementCustomerInventory={incrementCustomerInventory}
        />
        <PaymentOptions setBalance={setBalance} />
        <button
          className={styles.cancel}
          disabled={balance === 0}
          onClick={() => setBalance(0)}
        >
          {isUsingCash ? "Refund" : "Cancel"}
        </button>
        <Display customerInventory={customerInventory} />
      </BalanceContext>
    </div>
  );
}

import { createContext, useCallback, useContext, useState } from "react";
import styles from "./App.module.css";
import { useImmer } from "use-immer";

const INVENTORY = {
  cola: {
    price: 1_100,
    count: 5,
  },
  water: {
    price: 600,
    count: 5,
  },
  coffee: {
    price: 700,
    count: 5,
  },
};
type InventoryKeys = keyof typeof INVENTORY;
const CUSTOMER_INVENTORY: Record<InventoryKeys, number> = {
  cola: 0,
  water: 0,
  coffee: 0,
};
const EMOJIS: Record<InventoryKeys, string> = {
  cola: "\u{1F964}",
  water: "\u{1F4A7}",
  coffee: "\u2615 \uFE0F",
};
const CASH_DENOMINATIONS = [100, 500, 1_000, 5_000, 10_000];
const PAYMENT_OPTIONS = ["card", ...CASH_DENOMINATIONS];

type Balance = number | "card";

const BalanceContext = createContext<Balance>(0);

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

  return (
    <div className={styles.root}>
      <BalanceContext value={balance}>
        <div className={styles.leftContainer}>
          <Choices
            inventory={inventory}
            decrementInventory={decrementInventory}
            incrementCustomerInventory={incrementCustomerInventory}
          />
        </div>
        <div className={styles.rightContainer}>
          <PaymentOptions setBalance={setBalance} />
          <button
            className={styles.cancel}
            disabled={balance === 0}
            onClick={() => setBalance(0)}
          >
            {!balance || balance === "card" ? "Cancel" : "Refund"}
          </button>
          <Display customerInventory={customerInventory} />
        </div>
      </BalanceContext>
    </div>
  );
}

interface ChoicesProps {
  inventory: typeof INVENTORY;
  decrementInventory: (key: InventoryKeys) => void;
  incrementCustomerInventory: (key: InventoryKeys) => void;
}
function Choices({
  inventory,
  decrementInventory,
  incrementCustomerInventory,
}: ChoicesProps) {
  const balance = useContext(BalanceContext);

  return (
    <div className={styles.choicesContainer}>
      {Object.entries(inventory).map(([key, { price, count }]) => {
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
            data-insufficient-funds={isInsufficientFunds}
          >
            <span>{key}</span>
            <span>{count}</span>
          </button>
        );
      })}
    </div>
  );
}

interface PaymentOptions {
  setBalance: React.Dispatch<React.SetStateAction<Balance>>;
}
function PaymentOptions({ setBalance }: PaymentOptions) {
  let balance = useContext(BalanceContext);
  const isUsingCard = balance === "card";

  return (
    <div className={styles.paymentOptionsContainer}>
      {PAYMENT_OPTIONS.map((po) => {
        const isCard = typeof po === "string";

        if (isCard)
          return (
            <button
              key={po}
              disabled={balance !== 0}
              onClick={() => setBalance("card")}
              className={styles.paymentOption}
            >
              {po}
            </button>
          );

        const incrementBalance = (cashDenomination: number) => {
          if (balance === "card") return;

          setBalance((balance += cashDenomination));
        };

        return (
          <button
            key={po}
            disabled={isUsingCard}
            onClick={() => incrementBalance(po)}
            className={styles.paymentOption}
          >
            {new Intl.NumberFormat("ko", {
              style: "currency",
              currency: "KRW",
            }).format(po)}
          </button>
        );
      })}
    </div>
  );
}

interface DisplayProps {
  customerInventory: typeof CUSTOMER_INVENTORY;
}
function Display({ customerInventory }: DisplayProps) {
  const balance = useContext(BalanceContext);

  return (
    <div className={styles.displayContainer}>
      {balance === "card"
        ? "CARD"
        : Intl.NumberFormat("ko", {
            style: "currency",
            currency: "KRW",
          }).format(balance)}
      {Object.entries(customerInventory).map(([key, count]) => {
        return (
          <span key={key}>{`${EMOJIS[key as InventoryKeys]}: ${count}`}</span>
        );
      })}
    </div>
  );
}

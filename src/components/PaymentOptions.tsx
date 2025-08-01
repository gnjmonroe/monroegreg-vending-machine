import { useContext } from "react";
import { BalanceContext, type Balance } from "../BalanceContext";
import { PAYMENT_OPTIONS } from "../consts";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import styles from "./PaymentOptions.module.css";
import { formatKrw } from "../utils/formatKrw";

interface PaymentOptions {
  setBalance: React.Dispatch<React.SetStateAction<Balance>>;
}
export default function PaymentOptions({ setBalance }: PaymentOptions) {
  let balance = useContext(BalanceContext);

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
              {capitalizeFirstLetter(po)}
            </button>
          );

        const incrementBalance = (cashDenomination: number) => {
          if (balance === "card") return;

          setBalance((balance += cashDenomination));
        };

        return (
          <button
            key={po}
            disabled={balance === "card"}
            onClick={() => incrementBalance(po)}
            className={styles.paymentOption}
          >
            +{formatKrw(po)}
          </button>
        );
      })}
    </div>
  );
}

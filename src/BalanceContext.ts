import { createContext } from "react";

export type Balance = number | "card";
export const BalanceContext = createContext<Balance>(0);

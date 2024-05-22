import { ExchangeRates } from "./types";

export const formatMoney = (
  currency: ExchangeRates["currency"] = "EUR",
  amount: ExchangeRates["rate"]
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

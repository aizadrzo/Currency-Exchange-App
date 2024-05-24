import { ExchangeRates } from "./types";

type formatUrl = {
  amount: number;
  fromCurrency: ExchangeRates["currency"];
  toCurrency: ExchangeRates["currency"];
};

export const formatMoney = (
  currency: ExchangeRates["currency"] = "EUR",
  amount: number
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatUrl = ({ amount, fromCurrency, toCurrency }: formatUrl) => {
  const baseUrl = "https://api.frankfurter.app/latest";
  const params = new URLSearchParams();

  if (amount) params.append("amount", amount);
  if (fromCurrency) params.append("from", fromCurrency);
  if (toCurrency) params.append("to", toCurrency);

  const formattedUrl = `${baseUrl}?${params.toString()}`;
  return formattedUrl;
};

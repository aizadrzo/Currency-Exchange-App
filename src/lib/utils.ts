import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ExchangeRates, FormatUrl } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (
  currency: ExchangeRates["currency"] = "EUR",
  amount: number
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatUrl = ({
  amount,
  baseCurrency,
  toCurrency,
}: Partial<FormatUrl>) => {
  const baseUrl = "https://api.frankfurter.app/latest";
  const params = new URLSearchParams();

  if (amount) params.append("amount", amount.toString());
  if (baseCurrency) params.append("from", baseCurrency);
  if (toCurrency) params.append("to", toCurrency);

  const formattedUrl = `${baseUrl}?${params.toString()}`;
  return formattedUrl;
};

export const splitArrayIntoChunks = (
  array: ExchangeRates[],
  chunkSize: number
) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

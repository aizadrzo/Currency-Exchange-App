import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ExchangeRates, FormatUrl } from "@/types";

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
  fromCurrency,
  toCurrency,
}: Partial<FormatUrl>) => {
  const baseUrl = "https://api.frankfurter.app/latest";
  const params = new URLSearchParams();

  if (amount) params.append("amount", amount as unknown as string);
  if (fromCurrency) params.append("from", fromCurrency);
  if (toCurrency) params.append("to", toCurrency);

  const formattedUrl = `${baseUrl}?${params.toString()}`;
  return formattedUrl;
};

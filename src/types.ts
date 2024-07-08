import { Currencies } from "./constants";

export type ExchangeRates = {
  currency: keyof typeof Currencies;
  rate: number;
};

export type CurrencyList = {
  currency: keyof typeof Currencies;
  name: string;
};

export type FormatUrl = {
  amount: number;
  fromCurrency: keyof typeof Currencies;
  toCurrency: keyof typeof Currencies;
};

export type FormValues = {
  amount: number;
  converted: number;
  fromCurrency: keyof typeof Currencies;
  toCurrency: keyof typeof Currencies;
};

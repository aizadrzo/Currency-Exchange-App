import { Currencies } from "./constants/Currencies";

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
  baseCurrency: keyof typeof Currencies;
  toCurrency: keyof typeof Currencies;
};

export type FormValues = {
  amount: number;
  converted: number;
  baseCurrency: keyof typeof Currencies;
  toCurrency: keyof typeof Currencies;
};

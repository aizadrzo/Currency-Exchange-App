import { useEffect, useState } from "react";
import { ExchangeRates } from "../types";
import { formatUrl } from "../utils";
import { Currencies } from "../constants";

const useFetchLatestRates = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState<
    keyof typeof Currencies | null
  >(null);
  const [toCurrency, setToCurrency] = useState<keyof typeof Currencies | null>(
    null
  );
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates[]>([]);
  const [error, setError] = useState<string | null>(null);

  const params = {
    amount,
    fromCurrency,
    toCurrency,
  };

  const getLatestRates = async () => {
    try {
      const res = await fetch(formatUrl(params));
      const data = await res.json();
      const formattedCurrencies = Object.entries(data.rates).map(
        ([currency, rate]) => ({ currency, rate })
      );
      setExchangeRates(formattedCurrencies as ExchangeRates[]);
    } catch (err) {
      console.error("Error fetching latest rates:", err);
      setError("Failed to fetch latest rates.");
    }
  };

  useEffect(() => {
    getLatestRates();
  }, [amount, fromCurrency, toCurrency]);

  return {
    error,
    getLatestRates,
    exchangeRates,
    setFromCurrency,
    setAmount,
    setToCurrency,
  };
};

export default useFetchLatestRates;

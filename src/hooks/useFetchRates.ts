import { useEffect, useState } from "react";
import useFetchLatestRates from "./useFetchLatestRates";
import { formatUrl } from "@/lib/utils";
import { ExchangeRates } from "@/types";

const useFetchRates = () => {
  const [error, setError] = useState<string | null>(null);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates[]>([]);
  const { amount, fromCurrency } = useFetchLatestRates();

  const params = {
    amount,
    fromCurrency,
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
  }, [amount, fromCurrency]);

  return {
    exchangeRates,
    error,
  };
};

export default useFetchRates;

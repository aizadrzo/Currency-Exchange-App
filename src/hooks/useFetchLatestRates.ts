import { useEffect, useState } from "react";
import { ExchangeRates } from "../types";
import { formatUrl } from "@/lib/utils";
import { Currencies } from "../constants";

const useFetchLatestRates = () => {
  const [amount, setAmount] = useState(100);
  const [baseCurrency, setBaseCurrency] =
    useState<keyof typeof Currencies>("EUR");
  const [data, setData] = useState<ExchangeRates[]>([]);
  const [error, setError] = useState<string | null>(null);

  const params = {
    amount,
    baseCurrency,
  };

  const getLatestRates = async () => {
    try {
      const res = await fetch(formatUrl(params));
      const data = await res.json();
      const formattedCurrencies = Object.entries(data.rates).map(
        ([currency, rate]) => ({ currency, rate })
      );
      setData(formattedCurrencies as ExchangeRates[]);
    } catch (err) {
      console.error("Error fetching latest rates:", err);
      setError("Failed to fetch latest rates.");
    }
  };

  useEffect(() => {
    getLatestRates();
  }, [amount, baseCurrency]);

  return {
    error,
    data,
    setBaseCurrency,
    setAmount,
    baseCurrency,
    amount,
  };
};

export default useFetchLatestRates;

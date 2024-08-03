import { useEffect, useState } from "react";
import { ExchangeRates } from "../types";
import { formatUrl } from "@/lib/utils";
import { Currencies } from "../constants/Currencies";

const useFetchLatestRates = () => {
  const [isFetching, setIsFetching] = useState(false);
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
    setIsFetching(true);
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
    setIsFetching(false);
  };

  useEffect(() => {
    getLatestRates();
  }, [amount, baseCurrency]);

  return {
    isFetching,
    error,
    data,
    setBaseCurrency,
    setAmount,
    baseCurrency,
    amount,
    getLatestRates,
  };
};

export default useFetchLatestRates;

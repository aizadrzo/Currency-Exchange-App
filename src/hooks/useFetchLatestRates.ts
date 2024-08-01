import { useEffect, useState } from "react";
import { ExchangeRates } from "../types";
import { formatUrl } from "@/lib/utils";
import { Currencies } from "../constants";

const useFetchLatestRates = () => {
  const [amount, setAmount] = useState(100);
  const [baseCurrency, setBaseCurrency] =
    useState<keyof typeof Currencies>("EUR");
  const [toCurrency, setToCurrency] = useState<keyof typeof Currencies>("USD");
  const [data, setData] = useState<ExchangeRates[]>([]);
  const [error, setError] = useState<string | null>(null);

  const params = {
    amount,
    baseCurrency,
    toCurrency,
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
  }, [amount, baseCurrency, toCurrency]);

  return {
    error,
    data,
    setBaseCurrency,
    setAmount,
    setToCurrency,
    baseCurrency,
    toCurrency,
    amount,
  };
};

export default useFetchLatestRates;

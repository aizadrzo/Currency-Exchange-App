import { useEffect, useState } from "react";
import { ExchangeRates } from "../types";

const fetchLatestRates = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates[]>([]);

  const getLatestRates = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/latest");
      const data = await res.json();
      const formattedCurrencies = Object.entries(data.rates).map(
        ([currency, rate]) => ({ currency, rate })
      );
      setExchangeRates(formattedCurrencies as ExchangeRates[]);
    } catch (err) {
      console.error("Error fetching currencies:", err);
    }
  };

  useEffect(() => {
    getLatestRates();
  }, []);

  return {
    getLatestRates,
    exchangeRates,
    setExchangeRates,
  };
};

export default fetchLatestRates;

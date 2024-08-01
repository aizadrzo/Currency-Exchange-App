import { useEffect, useState } from "react";
import { CurrencyList } from "../types";

const useFetchCurrencyList = () => {
  const [data, setData] = useState<CurrencyList[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getCurrencyList = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      const formattedList = Object.entries(data).map(([currency, name]) => ({
        currency,
        name,
      }));
      setData(formattedList as CurrencyList[]);
    } catch (err) {
      console.error("Error fetching currency list:", err);
      setError("Failed fetching currency list.");
    }
  };

  useEffect(() => {
    getCurrencyList();
  }, []);

  return {
    error,
    data,
  };
};

export default useFetchCurrencyList;

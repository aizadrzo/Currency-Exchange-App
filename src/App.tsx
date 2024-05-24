import { useForm } from "react-hook-form";
import { ExchangeRates } from "./types";
import { formatMoney } from "./utils";
import { useFetchLatestRates, useFetchCurrencyList } from "./hooks";

const App = () => {
  const { exchangeRates, setAmount, setFromCurrency } = useFetchLatestRates();
  const { currencyList } = useFetchCurrencyList();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: {
    amount: number;
    fromCurrency: keyof typeof currencyList;
  }) => {
    setAmount(data.amount);
    setFromCurrency(data.fromCurrency);
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="amount">Amount</label>
        <input id="amount" type="number" {...register("amount")} />
        <label htmlFor="fromCurrency">Currency</label>
        <select {...register("fromCurrency")} defaultValue="EUR">
          {currencyList?.map(({ currency }) => (
            <option
              key={currency}
              value={currency}
              selected={currency === "EUR"}
            >
              {currency}
            </option>
          ))}
        </select>
        <input type="submit" />
      </form>
      <div>
        {exchangeRates?.length > 0 ? (
          exchangeRates?.map(({ currency, rate }: ExchangeRates) => (
            <p key={currency}>
              {currency} : {formatMoney(currency, rate)}
            </p>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;

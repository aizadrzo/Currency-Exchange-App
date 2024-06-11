import { SubmitHandler, useForm } from "react-hook-form";
import { useFetchLatestRates, useFetchCurrencyList } from "./hooks";
import { Currencies } from "./constants";

type FormValues = {
  amount: number;
  converted: number;
  fromCurrency: keyof typeof Currencies;
  toCurrency: keyof typeof Currencies;
};

const App = () => {
  const {
    exchangeRates,
    setAmount,
    setFromCurrency,
    setToCurrency,
    fromCurrency,
    toCurrency,
    amount,
  } = useFetchLatestRates();
  const { currencyList } = useFetchCurrencyList();
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      amount,
      toCurrency,
      fromCurrency,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setAmount(data.amount);
    setFromCurrency(data.fromCurrency);
    setToCurrency(data.toCurrency);
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Amount */}
        <label htmlFor="amount">Amount</label>
        <input id="amount" type="number" {...register("amount")} />
        {/* fromCurrency */}
        <label htmlFor="fromCurrency">Currency</label>
        <select {...register("fromCurrency")} defaultValue={fromCurrency}>
          {currencyList?.map(({ currency }) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        {/* toCurrency */}
        <label htmlFor="converted">Converted Amount</label>
        <input
          id="converted"
          type="number"
          value={exchangeRates[0]?.rate}
          {...register("converted")}
          readOnly
        />
        <label htmlFor="toCurrency">Currency</label>
        <select {...register("toCurrency")} defaultValue={toCurrency}>
          {currencyList?.map(({ currency }) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <input type="submit" />
      </form>
    </div>
  );
};

export default App;

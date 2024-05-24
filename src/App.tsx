import { useForm } from "react-hook-form";
import { ExchangeRates } from "./types";
import { formatMoney } from "./utils";
import useFetchLatestRates from "./hooks/useFetchLatestRates";

const App = () => {
  const { exchangeRates, setAmount } = useFetchLatestRates();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setAmount(data.amount);
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="amount">Amount</label>
        <input id="amount" type="number" {...register("amount")} />
        <button>Convert</button>
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

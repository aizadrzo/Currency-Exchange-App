import fetchCurrencies from "./hooks/fetchLatestRates";
import { ExchangeRates } from "./types";
import { formatMoney } from "./utils";

const App = () => {
  const { exchangeRates } = fetchCurrencies();
  return (
    <div>
      <h1>Currencies</h1>
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
  );
};

export default App;

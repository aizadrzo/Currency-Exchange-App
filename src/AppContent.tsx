import CurrencyConverter from "./components/CurrencyConverter";
import CurrencyExchangeTable from "./components/CurrencyExchangeTable";
import { useFetchLatestRates } from "./hooks";

const AppContent = () => {
  const {
    data: exchangeRates,
    setAmount,
    setBaseCurrency,
    baseCurrency,
    amount,
    isFetching,
  } = useFetchLatestRates();

  return (
    <div className="flex flex-col gap-4">
      <CurrencyConverter
        exchangeRates={exchangeRates}
        setAmount={setAmount}
        setBaseCurrency={setBaseCurrency}
        baseCurrency={baseCurrency}
        amount={amount}
        isFetching={isFetching}
      />
      <CurrencyExchangeTable exchangeRates={exchangeRates} />
    </div>
  );
};

export default AppContent;

import CurrencyConverter from "./components/CurrencyConverter";
import CurrencyTable from "./components/CurrencyTable";
import "./index.css";

const App = () => (
  <div className="grid w-full min-h-screen mt-auto place-content-center">
    <CurrencyConverter />
    <CurrencyTable />
  </div>
);

export default App;

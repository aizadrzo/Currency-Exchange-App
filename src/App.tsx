import CurrencyConverter from "./components/CurrencyConverter";
import "./index.css";

const App = () => (
  <div className="grid w-full min-h-screen mt-auto place-content-center">
    <div className="w-full sm:w-[77%] mx-auto p-4 max-w-[1024px]">
      <CurrencyConverter />
    </div>
  </div>
);

export default App;

import AppContent from "./AppContent";
import "./index.css";

const App = () => (
  <div className="grid w-full min-h-screen mt-auto place-content-center">
    <div className="w-full mx-auto p-4 sm:px-4 max-w-[1024px] sm:pt-5 sm:pb-10">
      <AppContent />
    </div>
  </div>
);

export default App;

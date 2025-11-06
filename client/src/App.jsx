import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator";
import "./index.css";
import "./App.css"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <QuoteGenerator />
              <WeatherModule />
              <CurrencyConverter />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


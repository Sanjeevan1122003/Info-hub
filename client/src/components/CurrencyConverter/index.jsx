import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { MdCurrencyExchange } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import axios from "axios";
import "./index.css";

const CurrencyConverter = () => {
    const [rates, setRates] = useState({});
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [amount, setAmount] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoader] = useState(true);

    const formatError = (err) => {
        if (!err) return "Something went wrong.";

        if (err.response) {
            switch (err.response.status) {
                case 404:
                    return "Currency data not found.";
                case 429:
                    return "Too many requests. Please try again later.";
                case 500:
                    return "Server error. Please try again later.";
                default:
                    return `Server error (${err.response.status}).`;
            }
        }

        if (err.message === "Network Error") {
            return "No internet connection. Please check your network.";
        }

        return err.message || "Unexpected error occurred.";
    };

    const fetchData = async () => {
        try {
            setLoader(true);
            setError("");

            const res = await axios.get("https://info-hub-8c91.vercel.app/api/currency");

            if (!res.data || !res.data.rates) {
                setError("Unable to load currency rates.");
                setLoader(false);
                return;
            }

            setRates(res.data.rates);
            setLoader(false);
        } catch (err) {
            setError(formatError(err));
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleConvert = () => {
        if (!amount || amount <= 0) {
            setError("Please enter a valid amount.");
            return;
        }

        const fromRate = rates[from];
        const toRate = rates[to];

        if (!fromRate || !toRate) {
            setError("Invalid currency selection.");
            return;
        }

        const usdAmount = amount / fromRate;
        const converted = usdAmount * toRate;

        setResult(converted.toFixed(2));
    };

    if (error) {
        return (
            <div className="currency-container">
                <h2 className="heading">
                    Currency Converter <MdCurrencyExchange />
                </h2>

                <div className="error-container">
                    <p>{error}</p>
                    <button type="button" onClick={fetchData}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="currency-container">
            <h2 className="heading">
                Currency Converter <MdCurrencyExchange />
            </h2>

            {loading ? (
                <div className="loader-container">
                    <ThreeDots visible={true} height="50" width="50" />
                </div>
            ) : (
                <div className="inputdetails">
                    <div className="input-container">
                        <div className="amount-container">
                            <label className="label">Amount: </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                            />
                        </div>

                        <div className="drop-down-inputs">
                            <div>
                                <label className="label">From: </label>
                                <select
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                >
                                    {Object.keys(rates).map((code) => (
                                        <option key={code} value={code}>
                                            {code}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="label">To: </label>
                                <select
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                >
                                    {Object.keys(rates).map((code) => (
                                        <option key={code} value={code}>
                                            {code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            className="convert-btn"
                            type="button"
                            onClick={handleConvert}
                        >
                            Convert
                        </button>
                    </div>

                    <div className="output-container">
                        {result !== null && (
                            <div className="result-container">
                                <div>
                                    <p className="name">{from}</p>
                                    <p className="amount">{amount  || "0.00"}</p>
                                </div>

                                <FaExchangeAlt className="exchange-icon" />

                                <div>
                                    <p className="name">{to}</p>
                                    <p className="amount">{result  || "0.00"}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrencyConverter;

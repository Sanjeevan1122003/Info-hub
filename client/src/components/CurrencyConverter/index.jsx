import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { MdCurrencyExchange } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import axios from "axios";
import "./index.css"


const CurrencyConverter = () => {
    const [rates, setRates] = useState({});
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [amount, setAmount] = useState(1);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoader] = useState(true);


    useEffect(() => {
        axios
            .get("http://localhost:5000/api/currency")
            .then((res) => {
                setRates(res.data.rates);

                const fromRate = res.data.rates[from];
                const toRate = res.data.rates[to];

                if (fromRate && toRate) {
                    const converted = (amount / fromRate) * toRate;
                    setResult(converted.toFixed(2));
                }

                setLoader(false);
            })
            .catch((err) => {
                setError("Failed to load currency rates", err);
                setLoader(false);
            });
    }, [from, to, amount]);

    const handleConvert = () => {
        if (!rates[from] || !rates[to]) {
            setError("Invalid currency selection");
            return;
        }

        const usdAmount = amount / rates[from];
        const converted = usdAmount * rates[to];
        setResult(converted.toFixed(2));
    };

    return (
        <div className="currency-container">
            <h2 className="heading">Currency Converter <MdCurrencyExchange /></h2>
            {/* {error && <p style={{ color: red, }}>{error}</p>}, */}
            {loading ? (<><div className="loader-container">
                <ThreeDots
                    visible={true}
                    height="50"
                    width="50"
                    color="#67c1dc"
                    ariaLabel="three-dots-loading"
                />
            </div></>) : (<>
                <div className="inputdetails">
                    <div className="input-container">
                        <div className="amount-container">
                            <label className="label">Amount: </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    handleConvert();
                                }}
                                placeholder="Enter amount"
                            />
                        </div >
                        <div className="drop-down-inputs">
                            <div >
                                <label className="label">From: </label>
                                <select
                                    value={from}
                                    onChange={e => setFrom(e.target.value)}
                                >
                                    {Object.keys(rates).map((code) => (
                                        <option key={code} value={code}>{code}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">To: </label>
                                <select
                                    value={to}
                                    onChange={e => setTo(e.target.value)}
                                >
                                    {Object.keys(rates).map((code) => (
                                        <option key={code} value={code}>{code}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div >
                    <div className="output-container">
                        {result && (
                            <div className="result-container">
                                <div>
                                    <p className="name">{from}</p>
                                    <p className="amount">{amount || "0.00"}</p></div>
                                <FaExchangeAlt className="exchange-icon" />
                                <div>
                                    <p className="name">{to}</p>
                                    <p className="amount">{result || "0.00"}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div ></>)}
        </div >
    );
}

export default CurrencyConverter
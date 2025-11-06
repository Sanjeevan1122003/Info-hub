import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { FaTemperatureHalf } from "react-icons/fa6";
import { TbTemperatureCelsius } from "react-icons/tb";
import { TiWeatherCloudy, TiWeatherDownpour, TiWeatherPartlySunny, TiWeatherStormy, TiWeatherSunny } from "react-icons/ti";

import "./index.css"

const WeatherModule = () => {
    const [data, setData] = useState(null);
    const [city, setCity] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const hasFetched = useRef(false);

    // ✅ Convert technical error → user-friendly message
    const formatError = (err) => {
        if (!err) return "Something went wrong.";

        if (err.code === 1) return "Location permission denied. Please allow location access.";
        if (err.code === 2) return "Unable to detect your location. Please try again.";
        if (err.code === 3) return "Location request timed out.";

        if (err.response) {
            switch (err.response.status) {
                case 404: return "City not found. Please check the spelling.";
                case 429: return "Too many requests. Please wait a moment and try again.";
                case 500: return "Server error. Please try again later.";
                default: return `Server responded with an error (${err.response.status}).`;
            }
        }

        if (err.message === "Network Error")
            return "No internet connection. Please check your network.";

        return err.message || "Unexpected error occurred.";
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        if (!navigator.geolocation) {
            setError("Your browser does not support location access.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const { latitude, longitude } = pos.coords;

                    const locResponse = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    const locData = await locResponse.json();

                    const cityData = locData.city || locData.locality || "Hyderabad";
                    setCity(cityData);

                    fetchWeather(cityData);
                } catch (err) {
                    setError(formatError(err));
                    setLoading(false);
                }
            },
            (err) => {
                setError(formatError(err));
                setLoading(false);
            }
        );
    }, []);

    const fetchWeather = async (targetCity) => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                `https://info-hub-8c91.vercel.app/api/weather?city=${targetCity}`
            );

            if (!response.data) {
                setError("No weather data found for the selected city.");
                setLoading(false);
                return;
            }

            setData(response.data);
            setCity(targetCity);
        } catch (err) {
            setError(formatError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchCity.trim() === "") {
            setError("Please enter a valid city name.");
            return;
        }
        fetchWeather(searchCity.trim());
        setSearchCity("");
    };

    const getWeatherIcon = (condition, temperature) => {
        if (!condition) return <TiWeatherPartlySunny className="weather-icon" />;

        const cond = condition.toLowerCase();

        if (cond.includes("rain") || cond.includes("drizzle")) {
            return <TiWeatherDownpour className="weather-icon rain" />;
        } else if (cond.includes("cloud")) {
            return <TiWeatherCloudy className="weather-icon cloudy" />;
        } else if (cond.includes("storm") || cond.includes("thunder")) {
            return <TiWeatherStormy className="weather-icon storm" />;
        } else if (cond.includes("sun") || cond.includes("clear")) {
            return <TiWeatherSunny className="weather-icon sunny" />;
        } else if (temperature < 15) {
            return <TiWeatherStormy className="weather-icon cold" />;
        } else if (temperature > 30) {
            return <TiWeatherSunny className="weather-icon hot" />;
        } else {
            return <TiWeatherPartlySunny className="weather-icon mild" />;
        }
    };

    return (
        <div className="weather-container">
            <h2 className="heading">Weather report <TiWeatherPartlySunny /> </h2>

            {error && (
                <div className="error-container">
                    <p>{error}</p>
                    <button type="button" onClick={() => fetchWeather(city || "Hyderabad")}>
                        Retry
                    </button>
                </div>
            )}

            {loading ? (
                <div className="loader-container">
                    <ThreeDots visible={true} height="50" width="50" color="#67c1dc" />
                </div>
            ) : (
                data && (
                    <div className="weather-data-container">
                        <div className="right-container">
                            <form onSubmit={handleSearch} className="form-container">
                                <input
                                    type="text"
                                    value={searchCity}
                                    onChange={(e) => setSearchCity(e.target.value)}
                                    placeholder="Enter city name"
                                    className="input-box"
                                />
                                <button type="submit" className="search-button">Search</button>
                            </form>

                            <h4 className="city-name">{data.name}</h4>

                            <div className="temperature-section">
                                <FaTemperatureHalf className="temp-icon" />
                                <h5 className="temperature-value">
                                    {data.temperature}
                                    <TbTemperatureCelsius className="degree-icon" />
                                </h5>
                            </div>
                        </div>

                        <div className="left-container">
                            <div className="weather-data">
                                <div className="minmax">
                                    <p><span>Min:</span> {data.minimumTemperature}°C</p>
                                    <p><span>Max:</span> {data.maximumTemperature}°C</p>
                                    <p><span>Humidity:</span> {data.humidity}%</p>
                                    <p><span>Feels Like:</span> {data.feelsLike}°C</p>
                                </div>
                            </div>
                        </div>

                        <div className="extra-details">
                            {getWeatherIcon(data.condition, data.temperature)}
                            <p><span>Condition: </span> {data.condition}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default WeatherModule;

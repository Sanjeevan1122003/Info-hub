import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { FaTemperatureHalf } from "react-icons/fa6";
import { TbTemperatureCelsius } from "react-icons/tb";
import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWeatherStormy } from "react-icons/ti";
import { TiWeatherSunny } from "react-icons/ti";

import "./index.css"

const WeatherModule = () => {
    const [data, setData] = useState(null);
    const [city, setCity] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

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
                    setError(err);
                    setLoading(false);
                }
            },
            (err) => {
                setError(err);
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
            setData(response.data);
            setCity(targetCity);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchCity.trim() === "") return;
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

    if (error) {
        return (
            <div className="weather-container">
                <h2 className="heading">Weather report <TiWeatherPartlySunny /> </h2>
                <div className="error-container">
                    <p>{error}</p>
                    <button type="button" onClick={() => fetchWeather(city)}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="weather-container">
            <h2 className="heading">Weather report <TiWeatherPartlySunny /> </h2>
            {loading ? (
                <div className="loader-container">
                    <ThreeDots
                        visible={true}
                        height="50"
                        width="50"
                        color="#67c1dc"
                        ariaLabel="three-dots-loading"
                    />
                </div>
            ) : (
                <>
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
                                <button type="submit" className="search-button">
                                    Search
                                </button>
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
                </>
            )
            }
        </div >
    );

};

export default WeatherModule;


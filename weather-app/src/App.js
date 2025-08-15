import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric"); // "metric" for °C, "imperial" for °F
  const [lastCity, setLastCity] = useState(""); // store last searched city

  const fetchWeather = async (city, selectedUnit = unit) => {
    try {
      setError("");
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${selectedUnit}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${selectedUnit}`
      );
      const forecastData = await forecastRes.json();

      const dailyForecasts = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(dailyForecasts);

      setLastCity(city); // save city name for later
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    }
  };

  const toggleUnit = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    if (lastCity) {
      fetchWeather(lastCity, newUnit); // re-fetch data with new unit
    }
  };

  return (
    <div className={`app ${weather ? weather.weather[0].main.toLowerCase() : ""}`}>
      <h1>Weather App</h1>
      <SearchBar onSearch={(city) => fetchWeather(city)} />
      <button className="unit-toggle" onClick={toggleUnit}>
        Switch to {unit === "metric" ? "°F" : "°C"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <WeatherCard weather={weather} unit={unit} />
      <ForecastList forecast={forecast} unit={unit} />
    </div>
  );
}

export default App;

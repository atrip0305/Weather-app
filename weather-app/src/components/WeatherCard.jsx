import React from "react";

function WeatherCard({ weather, unit }) {
  if (!weather || !weather.main) return null;

  const iconCode = weather.weather[0].icon;
  const tempUnit = unit === "metric" ? "°C" : "°F";

  return (
    <div style={styles.card}>
      <h2>{weather.name}, {weather.sys.country}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
        alt={weather.weather[0].description}
      />
      <p style={{ textTransform: "capitalize" }}>{weather.weather[0].description}</p>
      <h3>{Math.round(weather.main.temp)}{tempUnit}</h3>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} {unit === "metric" ? "m/s" : "mph"}</p>
    </div>
  );
}

const styles = {
  card: {
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    margin: "auto",
    background: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  }
};

export default WeatherCard;

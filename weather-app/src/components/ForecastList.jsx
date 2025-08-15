import React from "react";

function ForecastList({ forecast, unit }) {
  if (!forecast || forecast.length === 0) return null;

  const tempUnit = unit === "metric" ? "°C" : "°F";

  return (
    <div style={styles.container}>
      {forecast.map((day, index) => (
        <div key={index} style={styles.card}>
          <p style={styles.date}>
            {new Date(day.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
          />
          <p style={styles.temp}>{Math.round(day.main.temp)}{tempUnit}</p>
          <p style={styles.desc}>{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  card: {
    padding: "10px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.8)",
    textAlign: "center",
    width: "100px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease",
  },
  date: {
    fontWeight: "bold",
    fontSize: "14px",
  },
  temp: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  desc: {
    fontSize: "12px",
    textTransform: "capitalize",
    color: "#555",
  }
};

export default ForecastList;

"use client";

import { useState, useEffect } from "react";
import styles from "../css/estilosHeader/WeatherHeader.module.css";

export default function WeatherHeader() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);


  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Geolocalización soportada. Solicitando posición...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Posición obtenida:", position.coords);
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          console.log("Error al obtener ubicación:", err);
          setError("No se pudo obtener la ubicación.");
        }
      );
    } else {
      console.log("Geolocalización no soportada en este navegador.");
      setError("La geolocalización no está soportada en este navegador.");
    }
  }, []);

  // Reemplaza con tu propia API Key de OpenWeatherMap
  const API_KEY = "f640122a0aaad164205b3f68eeb88223";

  // Obtener ubicación del usuario
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setError("No se pudo obtener la ubicación.");
        }
      );
    } else {
      setError("La geolocalización no está soportada en este navegador.");
    }
  }, []);

  // Llamar a la API de OpenWeatherMap
  useEffect(() => {
    if (location.lat && location.lon) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&lang=es&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === 200) {
            setWeatherData(data);
          } else {
            setError("Error al obtener el clima.");
          }
        })
        .catch(() => {
          setError("Error al obtener el clima.");
        });
    }
  }, [location, API_KEY]);

  if (error) {
    return (
      <div className={styles.weatherHeaderContainer}>
        <p className={styles.errorMsg}>{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className={styles.weatherHeaderContainer}>
        <p className={styles.loading}>Cargando clima...</p>
      </div>
    );
  }

  // Extraer datos
  const { main, weather, name } = weatherData;
  const temperature = main?.temp;
  const description = weather?.[0]?.description;
  const cityName = name;

  // Fecha/hora
  const fechaHora = new Date().toLocaleString("es-ES", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className={styles.weatherHeaderContainer}>
      <div className={styles.weatherInfo}>
        <div className={styles.tempRow}>
          <span className={styles.temperature}>
            {Math.round(temperature)}°C
          </span>
          <span className={styles.description}>{description}</span>
        </div>
        <div className={styles.cityDate}>
          <span className={styles.cityName}>{cityName}</span>
          <span className={styles.fechaHora}>{fechaHora}</span>
        </div>
      </div>
    </div>
  );
}

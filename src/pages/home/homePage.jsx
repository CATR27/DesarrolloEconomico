import React, { useState, useEffect } from 'react';
import styles from '../css/estilosHome/estilosHomePage.module.css';
import Carrusel from './components/Carrusel';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  // Estado para el color central de la tarjeta (para la gradiente)
  const [centralColor, setCentralColor] = useState("#3B82F6");
  // Estado para el modo día/noche (elevado para compartirlo)
  const [isDay, setIsDay] = useState(true);

  const getWeather = async () => {
    const city = 'San Juan del Rio';
    const apiKey = 'f640122a0aaad164205b3f68eeb88223';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const url = `${protocol}://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del clima');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeather();
      if (data) setWeatherData(data);
    };
    fetchData();
  }, []);

  const getFormattedDate = () => {
    const now = new Date();
    const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    return `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
  };

  if (!weatherData) {
    return (
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <h2 className={styles.title}>Cargando clima...</h2>
        </div>
      </section>
    );
  }

  const {
    main: { temp, feels_like, humidity },
    weather,
    wind: { speed },
  } = weatherData;

  const weatherIcon = weather[0].icon;
  const weatherDescription = weather[0].description;
  const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  return (
    <>
      {/* Banner con fondo dinámico según la tarjeta central y modo (modo: blanco en día, negro en oscuro) */}
      <section
        className={styles.banner}
        style={{
          background: `linear-gradient(135deg, ${centralColor}, ${isDay ? '#ffffff' : '#000000'})`,
          color: isDay ? '#000' : '#fff'
        }}
      >
        <div className={styles.bannerContent}>
          <div className={styles.logoContainer}>
            <img
              src="/LOGO SJR HORIZONTAL 2_sinborde.png"
              alt="Logo SJR"
              className={styles.logoImage}
            />
          </div>
          <div className={styles.centerText}>
            <h2 className={styles.title}>Proyecto Desarrollo Económico</h2>
            <p className={styles.subtitle}>Selecciona una opción para comenzar</p>
          </div>
          <div className={styles.weatherCard}>
            <div className={styles.leftSection}>
              <h2 className={styles.cityName}>San Juan del Río</h2>
              <p className={styles.date}>{getFormattedDate()}</p>
              <div className={styles.tempWrapper}>
                <span className={styles.temp}>{Math.round(temp)}°C</span>
                <span className={styles.feelsLike}>Sensación: {Math.round(feels_like)}°C</span>
              </div>
            </div>
            <div className={styles.rightSection}>
              <img src={iconUrl} alt="Weather Icon" className={styles.weatherIcon} />
              <p className={styles.description}>{weatherDescription}</p>
              <p className={styles.details}>Humedad: {humidity}% <br />Viento: {speed} m/s</p>
            </div>
          </div>
        </div>
      </section>

      {/* Se pasa isDay, setIsDay y setCentralColor para que el carrusel comparta y actualice el modo y el color central */}
      <Carrusel 
        setCentralColor={setCentralColor} 
        isDay={isDay} 
        setIsDay={setIsDay}
      />
    </>
  );
}

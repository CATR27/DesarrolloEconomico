"use client";

import { useState, useEffect } from "react";
import { FaShoppingBag, FaHotel, FaUtensils, FaMapMarkedAlt, FaLandmark } from "react-icons/fa";
import styles from "../pages/css/estilosHome/Dashboard.module.css"; // Ajusta la ruta si es distinto

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (!root) return;
      if (darkMode) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [darkMode]);

  return (
    <div className={styles.dashboardContainer}>
      {/* Tarjeta alargada (header card) */}
      <header className={styles.headerCard}>
        <h1>Proyecto Desarrollo Económico</h1>
        <p>SELECCIONA UNA OPCIÓN PARA COMENZAR</p>
        {/* Switch para modo oscuro */}
        <div className={styles.switchContainer}>
          <label htmlFor="switch" className="switch">
            <input
              id="switch"
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"></span>
            <span className="decoration"></span>
          </label>
        </div>
      </header>

      {/* Contenido principal con tarjetas */}
      <main className={styles.mainContent}>
        <div className={styles.cardsContainer}>
          {/* Tarjeta 1: Consume Local */}
          <div className={`${styles.card} ${styles.cardBlue}`}>
            <span className={styles.cardNumber}>1</span>
            <div className={styles.iconWrapper}>
              <FaShoppingBag className={styles.cardIcon} size={100} />
            </div>
            <div className={styles.cardContent}>
              <h3>Consume Local</h3>
              <p>Consume productos locales de San Juan</p>
            </div>
          </div>

          {/* Tarjeta 2: Hoteles */}
          <div className={`${styles.card} ${styles.cardPink}`}>
            <span className={styles.cardNumber}>2</span>
            <div className={styles.iconWrapper}>
              <FaHotel className={styles.cardIcon} size={100} />
            </div>
            <div className={styles.cardContent}>
              <h3>Hoteles San Juan del Río</h3>
              <p>
                Descubre la variedad de hoteles que San Juan del Río tiene para ti
              </p>
            </div>
          </div>

          {/* Tarjeta 3: Restaurantes */}
          <div className={`${styles.card} ${styles.cardYellow}`}>
            <span className={styles.cardNumber}>3</span>
            <div className={styles.iconWrapper}>
              <FaUtensils className={styles.cardIcon} size={100} />
            </div>
            <div className={styles.cardContent}>
              <h3>Restaurantes San Juan del Río</h3>
              <p>
                Descubre la variedad de restaurantes que San Juan del Río tiene para ti
              </p>
            </div>
          </div>

          {/* Tarjeta 4: ¿Qué hacer? */}
          <div className={`${styles.card} ${styles.cardPurple}`}>
            <span className={styles.cardNumber}>4</span>
            <div className={styles.iconWrapper}>
              <FaMapMarkedAlt className={styles.cardIcon} size={100} />
            </div>
            <div className={styles.cardContent}>
              <h3>¿Qué hacer en San Juan del Río?</h3>
              <p>
                Descubre una gran variedad de actividades y monumentos en San Juan del Río
              </p>
            </div>
          </div>

          {/* Tarjeta 5: Origen */}
          <div className={`${styles.card} ${styles.cardGreen}`}>
            <span className={styles.cardNumber}>5</span>
            <div className={styles.iconWrapper}>
              <FaLandmark className={styles.cardIcon} size={100} />
            </div>
            <div className={styles.cardContent}>
              <h3>Origen San Juan</h3>
              <p>Descripción por definir</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../pages/css/estilosHome/Dashboard.module.css";

// Datos de ejemplo (5 tarjetas)
const bigCardsData = [
  {
    id: 1,
    title: "Consume Local",
    subtitle: "Productos de San Juan",
    extraText: "Apoya la economía local y disfruta de productos frescos y artesanales.",
    gradientClass: styles.cardBlue,
    shadowColor: "rgba(59, 130, 246, 0.7)",
    imgSrc: "/consumelocal.png",
  },
  {
    id: 2,
    title: "Hoteles",
    subtitle: "Hoteles San Juan del Río",
    extraText: "Encuentra las mejores opciones de hospedaje para disfrutar de la ciudad.",
    gradientClass: styles.cardPink,
    shadowColor: "rgba(236, 72, 153, 0.7)",
    imgSrc: "/hotel.png",
  },
  {
    id: 3,
    title: "Restaurantes",
    subtitle: "Variedad en San Juan",
    extraText: "Descubre la gastronomía regional y la mejor cocina internacional.",
    gradientClass: styles.cardYellow,
    shadowColor: "rgba(251, 191, 36, 0.7)",
    imgSrc: "/restaurant.png",
  },
  {
    id: 4,
    title: "¿Qué hacer?",
    subtitle: "Actividades y Monumentos",
    extraText: "Desde paseos históricos hasta eventos culturales, ¡hay mucho que explorar!",
    gradientClass: styles.cardPurple,
    shadowColor: "rgba(167, 139, 250, 0.7)",
    imgSrc: "/actividades.png",
  },
  {
    id: 5,
    title: "Origen San Juan",
    subtitle: "Descripción por definir",
    extraText: "Próximamente más información sobre la historia y tradiciones de San Juan.",
    gradientClass: styles.cardGreen,
    shadowColor: "rgba(52, 211, 153, 0.7)",
    imgSrc: "/origen.png",
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(2); // Tarjeta central

  // Estado para el estilo dinámico de fondo
  const [bgStyle, setBgStyle] = useState({});

  useEffect(() => {
    // Manejo de modo oscuro/claro
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

  // Cada vez que cambia la tarjeta central, actualizamos el fondo
  useEffect(() => {
    const centerCard = bigCardsData[currentIndex];
    // Tomamos el color principal (shadowColor) y lo hacemos opaco
    const colorSolid = centerCard.shadowColor.replace("0.7)", "1)");
    // Fondo con un gradiente lineal uniforme
    // Se mezcla con color base oscuro/claro según modo
    setBgStyle({
      background: darkMode
        ? `linear-gradient(135deg, ${colorSolid} 0%, #1a1a1a 100%)`
        : `linear-gradient(135deg, ${colorSolid} 0%, #fdfdfd 100%)`,
    });
  }, [currentIndex, darkMode]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? bigCardsData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= bigCardsData.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className={styles.carouselContainer} style={bgStyle}>
      {/* Encabezado */}
      <header className={styles.headerArea}>
        <h1>Proyecto Desarrollo Económico</h1>
        <p>SELECCIONA UNA OPCIÓN PARA COMENZAR</p>
        <div className={styles.switchContainer}>
          {/* Switch modo oscuro (luna/sol) */}
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

      <h2 className={styles.carouselTitle}>Popular this week</h2>

      {/* Carrusel */}
      <div className={styles.carouselTrackContainer}>
        <button onClick={handlePrev} className={styles.navButton}>
          ←
        </button>

        <div className={styles.carouselTrack}>
          {bigCardsData.map((card, index) => {
            // Cálculo de diferencia circular para mostrar solo 3 tarjetas
            let diff = index - currentIndex;
            if (diff > 2) diff -= bigCardsData.length;
            if (diff < -2) diff += bigCardsData.length;

            if (Math.abs(diff) > 1) return null; // Solo la central y las adyacentes

            // ¿Es la tarjeta central?
            const isCenterCard = diff === 0;

            // Escala y box-shadow de la tarjeta central
            const scale = isCenterCard
              ? 1.4
              : 1 - Math.min(Math.abs(diff) * 0.1, 0.6);

            // Distancia horizontal entre tarjetas
            const translateX = diff * 350;

            // Resplandor + profundidad en la tarjeta central
            const boxShadow = isCenterCard
              ? `0 0 60px ${card.shadowColor}, 0 10px 25px rgba(0,0,0,0.3)`
              : "none";

            // Posicionamiento en el carrusel
            const cardStyle: React.CSSProperties = {
              position: "absolute",
              left: "50%",
              transform: `translateX(-50%) translateX(${translateX}px) scale(${scale})`,
              zIndex: 10 - Math.abs(diff),
              boxShadow,
            };

            return (
              <div
                key={card.id}
                // Gradiente de la tarjeta
                className={`${styles.bigCard} ${card.gradientClass}`}
                style={cardStyle}
              >
                {/* Contenedor interno para animación de inclinación en la tarjeta central */}
                <div
                  className={
                    isCenterCard ? styles.centerCardAnimation : ""
                  }
                >
                  {/* Encabezado de la tarjeta (imagen) */}
                  <div className={styles.cardHeader}>
                    <Image
                      src={card.imgSrc}
                      alt={card.title}
                      width={120}
                      height={120}
                      className={styles.cardImage}
                      priority={isCenterCard} // para cargar antes la imagen de la tarjeta central
                    />
                  </div>

                  {/* Contenedor con borde redondeado para texto + botón */}
                  <div className={styles.contentContainer}>
                    <div className={styles.cardBody}>
                      <h3 className={styles.bigCardTitle}>{card.title}</h3>
                      <p className={styles.bigCardSubtitle}>{card.subtitle}</p>
                      <p className={styles.bigCardExtra}>{card.extraText}</p>
                    </div>

                    <div className={styles.cardFooter}>
                      <button className={styles.startButton}>Iniciar</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={handleNext} className={styles.navButton}>
          →
        </button>
      </div>
    </div>
  );
}

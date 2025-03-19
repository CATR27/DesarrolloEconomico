import React, { useState, useEffect } from 'react';
import styles from '../../css/estilosHome/stylesCarrusel.module.css';

// Funciones para aclarar/oscurecer colores (opcionales)
function lightenColor(hex, amount = 0.2) {
  let c = hex.replace(/^#/, '');
  if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  const num = parseInt(c, 16);
  let r = (num >> 16) + Math.round(255 * amount);
  let g = ((num >> 8) & 0xff) + Math.round(255 * amount);
  let b = (num & 0xff) + Math.round(255 * amount);
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}
function darkenColor(hex, amount = 0.2) {
  return lightenColor(hex, -amount);
}

export default function Carrusel({ setCentralColor, isDay, setIsDay }) {
  const data = [
    {
      id: 1,
      title: "Consume Local",
      subtitle: "Productos de San Juan",
      extraText:
        "Apoya la economía local y disfruta de productos frescos y artesanales.",
      gradientClass: styles.cardBlue,
      shadowColor: "rgba(59, 130, 246, 0.7)",
      imgSrc: "/consumelocal.png",
      link: "/consumelocal",
      bgColor: "#3B82F6"
    },
    {
      id: 2,
      title: "Hoteles",
      subtitle: "Hoteles San Juan del Río",
      extraText:
        "Encuentra las mejores opciones de hospedaje para disfrutar de la ciudad.",
      gradientClass: styles.cardPink,
      shadowColor: "rgba(236, 72, 153, 0.7)",
      imgSrc: "/hotel.png",
      link: "/Hoteles/hoteles",
      bgColor: "#EC4899"
    },
    {
      id: 3,
      title: "Restaurantes",
      subtitle: "Variedad en San Juan",
      extraText:
        "Descubre la gastronomía regional y la mejor cocina internacional.",
      gradientClass: styles.cardYellow,
      shadowColor: "rgba(251, 191, 36, 0.7)",
      imgSrc: "/restaurant.png",
      link: "/restaurantes",
      bgColor: "#FBBF24"
    },
    {
      id: 4,
      title: "¿Qué hacer?",
      subtitle: "Actividades y Monumentos",
      extraText:
        "Desde paseos históricos hasta eventos culturales, ¡hay mucho que explorar!",
      gradientClass: styles.cardPurple,
      shadowColor: "rgba(167, 139, 250, 0.7)",
      imgSrc: "/actividades.png",
      link: "/actividades",
      bgColor: "#A78BFA"
    },
    {
      id: 5,
      title: "Origen San Juan",
      subtitle: "Descripción por definir",
      extraText:
        "Próximamente más información sobre la historia y tradiciones de San Juan.",
      gradientClass: styles.cardGreen,
      shadowColor: "rgba(52, 211, 153, 0.7)",
      imgSrc: "/origen.png",
      link: "/origen",
      bgColor: "#34D399"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = data.length;

  // Toggle día/noche
  const toggleDayNight = () => setIsDay(!isDay);

  // Funciones de navegación
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Cálculo de índices para tarjetas
  const leftIndex = (currentIndex - 1 + total) % total;
  const centerIndex = currentIndex;
  const rightIndex = (currentIndex + 1) % total;

  // Asigna la clase según la posición
  const getPositionClass = (i) => {
    if (i === leftIndex) return styles.leftCard;
    if (i === centerIndex) return styles.centerCard;
    if (i === rightIndex) return styles.rightCard;
    // El resto de tarjetas se ocultan
    return styles.hiddenCard;
  };

  // Cada vez que cambia la tarjeta central, se actualiza el color en el padre
  useEffect(() => {
    setCentralColor(data[centerIndex].bgColor);
  }, [centerIndex, setCentralColor]);

  // Degradado para el body (empieza en esquina inferior derecha)
  const backgroundStyle = isDay
    ? `linear-gradient(to top left, #ffffff, ${data[centerIndex].bgColor})`
    : `linear-gradient(to top left, #000000, ${data[centerIndex].bgColor})`;

  // Aplica el degradado al body
  useEffect(() => {
    document.body.style.background = backgroundStyle;
    document.body.style.transition = "background 0.6s ease";
    return () => {
      document.body.style.background = "";
      document.body.style.transition = "";
    };
  }, [backgroundStyle]);

  return (
    <>
      {/* Botón día/noche */}
      <div className={styles.dayNightToggle} onClick={toggleDayNight}>
        {isDay ? '☀️' : '🌙'}
      </div>

      <div className={styles.carruselContainer}>
        <button className={styles.arrowBtn} onClick={handlePrev}>
          &#10094;
        </button>

        <div className={styles.cardsWrapper}>
          {data.map((item, i) => {
            return (
              <div
                key={item.id}
                className={`${styles.card} ${item.gradientClass} ${getPositionClass(i)}`}
                style={{ boxShadow: `0 10px 25px ${item.shadowColor}` }}
              >
                <img src={item.imgSrc} alt={item.title} className={styles.cardImage} />
                <div className={styles.overlay}>
                  <h2 className={styles.cardTitle}>{item.title}</h2>
                  <h3 className={styles.cardSubtitle}>{item.subtitle}</h3>
                  <p className={styles.cardText}>{item.extraText}</p>
                  <button className={styles.cardButton}>Iniciar</button>
                </div>
              </div>
            );
          })}
        </div>

        <button className={styles.arrowBtn} onClick={handleNext}>
          &#10095;
        </button>
      </div>
    </>
  );
}

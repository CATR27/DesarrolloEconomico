"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import HotelDetails from "./components/hotelDetails"; // Ajusta la ruta
import styles from "../css/estilosHoteles/Hoteles.module.css";

export default function HotelesDashboard() {
  // Datos de ejemplo para la sección de detalles
  const detailsHotel1 = {
    location: "Carretera Panamericana Pte. No. 3, Col. La Venta; San Juan del Río, Querétaro; C.P. 76800; México",
    schedule: "Lunes a Viernes: 8am - 10pm",
    services: "Piscina, Spa, Restaurante, WiFi gratuito",
    additionalPhotos: [
      "/fotoHoteles/hotel1-2.jpg",
      "/fotoHoteles/hotel1-3.jpg",
      "/fotoHoteles/hotel1-4.jpg",
    ],
  };

  // Estado para controlar si se muestran los detalles del Hotel 1
  // (Puedes hacer lo mismo para Hotel 2 y 3 o un 'selectedHotel' general)
  const [showDetailsHotel1, setShowDetailsHotel1] = useState(false);

  // Maneja el cierre del contenedor de detalles
  const handleCloseDetails = () => {
    setShowDetailsHotel1(false);
  };

  return (
    <div className={styles.hotelesContainer}>
      {/* Banner */}
      <div className={styles.banner}>
        <h1 className={styles.bannerTitle}>Bienvenido a los Mejores Hoteles</h1>
        <p className={styles.bannerSubtitle}>
          Disfruta de una experiencia inolvidable en San Juan del Río
        </p>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <Image
              src="/hotel.png"
              alt="Logo Hoteles"
              width={50}
              height={50}
            />
            <span>Hoteles SJR</span>
          </div>
          <ul className={styles.navLinks}>
            <li>Inicio</li>
          </ul>
        </nav>
      </header>

      {/* Contenedor principal de tarjetas */}
      <section className={styles.cardsSection}>
        <h2 className={styles.sectionTitle}>Hoteles Destacados</h2>
        <div className={styles.cardContainer}>
          {/* Tarjeta 1 */}
          <div className={styles.hotelCard}>
            <div className={styles.imageWrapper}>
              <Image
                src="/fotoHoteles/hotel1.jpg"
                alt="Hotel Ejemplo 1"
                fill
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Hotel Hacienda La Venta</h3>
              <p className={styles.cardDescription}>
                Hace más de 400 años, por el año de 1585 en el lugar donde se
                encuentra ahora ubicado este hotel, otorgaron por mandato real y
                como merced a Baltasar de Salazar, un sitio para venta en los
                linderos del pueblo de San Juan del Río, con el propósito de dar
                hospedaje a las personas que pasaran por ahí.
              </p>
              <div className={styles.socialIcons}>
                <a
                  href="#"
                  className={`${styles.socialIcon} ${styles.facebookIcon}`}
                  data-tooltip="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className={`${styles.socialIcon} ${styles.instagramIcon}`}
                  data-tooltip="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className={`${styles.socialIcon} ${styles.whatsappIcon}`}
                  data-tooltip="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
              <button
                className={styles.cardButton}
                onClick={() => setShowDetailsHotel1(!showDetailsHotel1)}
              >
                {showDetailsHotel1 ? "Ocultar detalles" : "Ver detalles"}
              </button>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className={styles.hotelCard}>
            <div className={styles.imageWrapper}>
              <Image
                src="/fotoHoteles/hotel2.jpg"
                alt="Hotel Ejemplo 2"
                fill
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>
                Fiesta Americana Hacienda Galindo Resort & SPA
              </h3>
              <p className={styles.cardDescription}>
                Una auténtica hacienda en Querétaro que captura la esencia de la
                opulencia y la tradición mexicanas.
              </p>
              <div className={styles.socialIcons}>
                <a
                  href="#"
                  className={`${styles.socialIcon} ${styles.facebookIcon}`}
                  data-tooltip="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className={`${styles.socialIcon} ${styles.instagramIcon}`}
                  data-tooltip="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className={`${styles.socialIcon} ${styles.whatsappIcon}`}
                  data-tooltip="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
              <button className={styles.cardButton}>Ver detalles</button>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className={styles.hotelCard}>
            <div className={styles.imageWrapper}>
              <Image
                src="/fotoHoteles/hotel3.jpg"
                alt="Hotel Ejemplo 3"
                fill
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>Hotel Brök San Juan del Río</h3>
              <p className={styles.cardDescription}>
                Hotel Brök ofrece alojamiento con centro de fitness, parking
                privado, jardín, terraza, restaurante, bar, piscina cubierta y
                bañera de hidromasaje.
              </p>
              <div className={styles.socialIcons}>
                <a
                  href="#"
                  className={`${styles.socialIcon} ${styles.facebookIcon}`}
                  data-tooltip="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className={`${styles.socialIcon} ${styles.instagramIcon}`}
                  data-tooltip="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className={`${styles.socialIcon} ${styles.whatsappIcon}`}
                  data-tooltip="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
              <button className={styles.cardButton}>Ver detalles</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contenedor de detalles - Aparece aparte, debajo de las tarjetas */}
      {showDetailsHotel1 && (
        <section className={styles.detailsSection}>
          <HotelDetails details={detailsHotel1} onClose={handleCloseDetails} />
        </section>
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2025 Hoteles SJR. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

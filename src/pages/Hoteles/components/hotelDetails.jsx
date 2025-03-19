"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaClock,
  FaConciergeBell,
  FaExpand,
} from "react-icons/fa";
import styles from "../../css/estilosHoteles/HotelDetails.module.css";

export default function HotelDetails({ details, onClose }) {
  if (!details) return null;

  // Estado para controlar el modal de imagen ampliada
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleOpenModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className={styles.detailsContainer}>
      {/* Encabezado */}
      <div className={styles.detailsHeader}>
        <h4 className={styles.detailsTitle}>Información detallada</h4>
        <button className={styles.detailsCloseButton} onClick={onClose}>
          Cerrar
        </button>
      </div>

      {/* Contenido en fila: Info + Fotos */}
      <div className={styles.detailsContent}>
        {/* Info a la izquierda */}
        <div className={styles.infoColumn}>
          <p className={styles.detailsItem}>
            <FaMapMarkerAlt className={styles.iconLeft} />
            <strong>Ubicación:</strong> {details.location}
          </p>
          <p className={styles.detailsItem}>
            <FaClock className={styles.iconLeft} />
            <strong>Horario:</strong> {details.schedule}
          </p>
          <p className={styles.detailsItem}>
            <FaConciergeBell className={styles.iconLeft} />
            <strong>Servicios:</strong> {details.services}
          </p>
        </div>

        {/* Fotos a la derecha */}
        <div className={styles.photosColumn}>
          <h5 className={styles.additionalPhotosTitle}>Fotos adicionales</h5>
          <div className={styles.photosGrid}>
            {details.additionalPhotos?.map((photo, index) => (
              <div
                key={index}
                className={styles.photoWrapper}
                onClick={() => handleOpenModal(photo)}
              >
                <Image
                  src={photo}
                  alt={`Foto adicional ${index + 1}`}
                  width={130}
                  height={100}
                  className={styles.additionalPhoto}
                />
                <div className={styles.hoverIcon}>
                  <FaExpand />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal para imagen ampliada */}
      {selectedPhoto && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalCloseButton}
              onClick={handleCloseModal}
            >
              <FaTimes />
            </button>
            <div className={styles.modalImageWrapper}>
              <Image
                src={selectedPhoto}
                alt="Foto ampliada"
                fill
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       33vw"
                className={styles.modalImage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
// Esta directiva indica que este archivo se debe renderizar
// en el lado del cliente (cliente-side) en Next.js

import { useState } from "react";
import { useRouter } from "next/navigation"; // Si usas el App Router
import useLogin from "../../hooks/login/useLogin";  // Ajusta la ruta según tu proyecto
import styles from "../css/estilosLogin/Login.module.css";       // Import de CSS Module

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(username, password);

    if (data) {
      // Login exitoso
      alert("¡Login exitoso!");
      // Redirigir o manejar la sesión
      // router.push("/dashboard");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Usuario:
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Contraseña:
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Verificando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función que hace la petición al endpoint /api/login
  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/login/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Si todo fue bien, data podría contener info del usuario o un token
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return null;
    }
  };

  return { login, loading, error };
}

// connection.js
import sql from "mssql";

const dbConfig = {
  user: "catr27",                   // Tu usuario SQL
  password: "Ontheroad27",           // Tu contraseña
  server: "localhost\\SQLEXPRESS",   // Asegúrate de usar la instancia correcta
  database: "DesarrolloEconomico",
  options: {
    trustServerCertificate: true,    // Para entornos de desarrollo (omite en producción)
  },
};

let poolPromise = null;

export async function connectDB() {
  try {
    if (!poolPromise) {
      poolPromise = sql.connect(dbConfig);
    }
    return poolPromise;
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    throw error;
  }
}

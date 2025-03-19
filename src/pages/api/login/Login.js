// api/login.js
import { connectDB } from "../bdd/connection"; // Ajusta la ruta según tu estructura
import sql from "mssql";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Faltan credenciales" });
  }

  try {
    // Conectar a la base de datos
    const pool = await connectDB();

    // Ejecutar la consulta para buscar al usuario
    const result = await pool
      .request()
      .input("user", sql.VarChar, username)
      .input("pass", sql.VarChar, password)
      .query(`
        SELECT TOP 1 *
        FROM [DesarrolloEconomico].[dbo].[UsuariosPanel]
        WHERE nombre_usuario = @user
          AND [password] = @pass
      `);

    if (result.recordset.length > 0) {
      return res.status(200).json({
        message: "Login exitoso",
        user: result.recordset[0],
      });
    } else {
      return res.status(401).json({ message: "Usuario o contraseña inválidos" });
    }
  } catch (error) {
    console.error("Error en la API /login:", error);
    return res.status(500).json({ message: "Error de servidor" });
  }
}

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456", 
  database: "saludya"
});
/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456', // la que pusiste
  database: 'tu_db'
});*/

db.connect((err) => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err);
  } else {
    console.log("✅ Conectado a MySQL");
  }
});



app.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("🔐 LOGIN:", email);

  const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("❌ Error en login:", err);
      return res.json({ success: false });
    }

    if (result.length > 0) {
      console.log("✅ LOGIN OK");

      res.json({
        success: true,
        user: result[0]
      });
    } else {
      console.log("❌ LOGIN FALLÓ");

      res.json({
        success: false,
        message: "Usuario no encontrado"
      });
    }
  });
});


app.post("/register", (req, res) => {
  const {
    nombre,
    email,
    password,
    telefono,
    tipo_id,
    numero_id,
    rh
  } = req.body;

  console.log("📝 REGISTRO:", email);

  const sql = `
    INSERT INTO usuarios (nombre, email, password, telefono, tipo_id, numero_id, rh)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombre, email, password, telefono, tipo_id, numero_id, rh],
    (err, result) => {
      if (err) {
        console.error("❌ Error en registro:", err);
        return res.json({ success: false });
      }

      console.log("✅ USUARIO REGISTRADO");

      res.json({
        success: true
      });
    }
  );
});



app.get("/usuario/:email", (req, res) => {
  const { email } = req.params;

  console.log("👤 BUSCANDO USUARIO:", email);

  const sql = "SELECT * FROM usuarios WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("❌ Error obteniendo usuario:", err);
      return res.json({ success: false });
    }

    res.json({
      success: true,
      user: result[0]
    });
  });
});



app.post("/citas", (req, res) => {

  console.log("🔥 REQUEST /citas RECIBIDO");

  const {
    paciente_email,
    especialidad,
    medico,
    fecha,
    hora
  } = req.body;

  console.log("📥 DATOS RECIBIDOS:", {
    paciente_email,
    especialidad,
    medico,
    fecha,
    hora
  });

  const sql = `
    INSERT INTO citas (paciente_email, especialidad, medico, fecha, hora)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [paciente_email, especialidad, medico, fecha, hora],
    (err, result) => {
      if (err) {
        console.error("💀 ERROR SQL:", err);
        return res.json({ success: false });
      }

      console.log("✅ CITA GUARDADA");

      res.json({ success: true });
    }
  );
});



app.get("/citas/:email", (req, res) => {
  const { email } = req.params;

  console.log("📅 BUSCANDO CITAS DE:", email);

  const sql = "SELECT * FROM citas WHERE paciente_email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("❌ Error obteniendo citas:", err);
      return res.json({ success: false });
    }

    res.json({
      success: true,
      citas: result
    });
  });
});

app.listen(3001, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3001");
});
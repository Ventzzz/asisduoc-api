import express from  'express';
import fs from "fs";

const pool = require('./db');
const app = express();

const readData = () => {
    try{
        const data = fs.readFileSync("./db.json");
        console.log(JSON.parse(data));
        return data;
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {

};

//POST CREAR CLASE
app.post("/crearClase", (req, res) => {
     const { nombre_clase, horario } = req.body; // Desestructuramos los datos del cuerpo de la solicitud

    // Verificar que los datos necesarios están presentes
    if (!nombre_clase || !horario) {
        return res.status(400).json({ error: 'Faltan datos: nombre_clase y horario son requeridos.' });
    }

    try {
        // Crear una nueva clase en la base de datos
        const result = await pool.query(
            'INSERT INTO clases (nombre_clase, horario) VALUES ($1, $2) RETURNING *',
            [nombre_clase, horario]
        );

        // Devolver la nueva clase creada como respuesta
        const nuevaClase = result.rows[0];
        res.status(201).json({
            message: 'Clase creada exitosamente',
            clase: nuevaClase,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al crear la clase' });
    }
});
//GET GENERAR CODIGO
app.get("/generarCodigoClase/:clase", (req, res) => {
    res.send("GENERAR CODIGO")
});
//POST CONFIRMAR ASISTENCIA
app.post("/admitirAlumno/:clase/:codigo", (req, res) => {
    res.send("CONFIRMAR ASISTENCIA")
});
//GET OBTENER TODAS LASCLASES
app.get("/obtenerClases", (req, res) => {
    try {
    // Realizamos una consulta SQL usando el pool de conexiones
    const result = await pool.query('SELECT * FROM clases;');
    res.json(result.rows);  // Devuelve los resultados como JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener las clases' });
  }
});
//GET OBTENER UNA CLASE
app.get("/obtenerClase/:clase", (req, res) => {
    res.send("OBTENER UNA CLASE")
});













app.post("/",(req, res) => {
    res.send("Welcome to my first API with Node Js")
})

const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log('Server listening on port ${port}');
});

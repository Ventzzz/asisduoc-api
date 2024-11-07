import express from  'express';
import fs from "fs";

import pool from './db.js';
import cors from 'cors';
const app = express();

app.use(express.json());  // Esto es lo que necesitas agregar
app.use(cors({
    origin: 'http://localhost:5432' // Permite solo este origen, que es el de tu app en desarrollo
  }));


function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    return code;
}

//POST CREAR CLASE
app.post("/crearClase", async (req, res) => {
    console.log(req.body)

     const { nombre_clase, horario } = req.body; // Desestructuramos los datos del cuerpo de la solicitud

    // Verificar que los datos necesarios están presentes
    if (!nombre_clase || !horario) {
        return res.status(400).json({ error: 'Faltan datos: nombre_clase y horario son requeridos.' });
    }

    try {
        // Crear una nueva clase en la base de datos
        const result = await pool.query(
            'INSERT INTO clase (nombre_clase, horario) VALUES ($1, $2) RETURNING *',
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
app.post("/generarCodigoClase", async (req, res) => {
    console.log(req.body)

    const { id_clase } = req.body; // Desestructuramos los datos del cuerpo de la solicitud

    const length = 8; // Longitud del código aleatorio (puedes ajustarlo)
    const randomCode = generateRandomCode(length);

    if (!id_clase) {
        return res.status(400).json({ error: 'Faltan datos: id_clase.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO codigo (codigo, clase_id) VALUES ($1, $2) RETURNING *',
            [id_clase, randomCode]
        );

        // Devolver la nueva clase creada como respuesta
        const nuevaClase = result.rows[0];
        res.status(201).json({
            message: 'Codigo creado exitosamente',
            clase: nuevaClase,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al crear la clase' });
    }
});
//POST CONFIRMAR ASISTENCIA
app.post("/admitirAlumno/:clase/:codigo", (req, res) => {
    res.send("CONFIRMAR ASISTENCIA")
});
//GET OBTENER TODAS LASCLASES
app.get("/obtenerClases", async (req, res) => {
    try {
    // Realizamos una consulta SQL usando el pool de conexiones
    const result = await pool.query('SELECT * FROM clase;');
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
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});
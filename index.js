import express from  'express';

import pool from './db.js';
import cors from 'cors';
const app = express();

app.use(express.json());  // Esto es lo que necesitas agregar
app.use(cors({
    origin: '*' // Permite solo este origen, que es el de tu app en desarrollo
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
            [randomCode, id_clase]
        );

        // Devolver la nueva clase creada como respuesta
        const nuevoCodigo = result.rows[0];
        res.status(201).json({
            message: 'Codigo creado exitosamente',
            codigo: nuevoCodigo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al crear el código' });
    }
});
//POST CONFIRMAR ASISTENCIA
app.post("/admitirAlumno", async (req, res) => {
    console.log(req.body)

    const { id_alumno, codigo } = req.body; // Desestructuramos los datos del cuerpo de la solicitud

    if (!id_alumno) {
        return res.status(400).json({ error: 'Faltan datos: id_alumno.' });
    }

    if (!codigo) {
        return res.status(400).json({ error: 'Faltan datos: codigo.' });
    }

    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0'); // Obtener la hora con dos dígitos
    const minutes = currentTime.getMinutes().toString().padStart(2, '0'); // Obtener los minutos con dos dígitos
    const formattedTime = `${hours}:${minutes}`; // Formato final "HH:mm"

    try {
        const resultCodigo = await pool.query(
            'SELECT clase_id FROM codigo WHERE codigo = $1',
            [codigo]
        );

        const resultClase = await pool.query(
            'SELECT id FROM clase WHERE id = $1',
            [resultCodigo.rows[0].clase_id]
        );

        const resultAsistencia = await pool.query(
            'INSERT INTO asistencia (alumno_id, clase_id, hora) VALUES ($1, $2, $3) RETURNING *',
            [id_alumno, resultClase.rows[0].id, formattedTime]
        );

        // Devolver la nueva clase creada como respuesta
        const nuevaAsistencia = resultAsistencia.rows[0];
        res.status(201).json({
            message: 'Asistencia registrada exitosamente',
            asistencia: nuevaAsistencia,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al registrar la asistencia' });
    }
});

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

app.post("/registrarAlumno", async (req, res) => {
    console.log(req.body)

    const { nombre_alumno } = req.body; // Desestructuramos los datos del cuerpo de la solicitud

    if (!nombre_alumno) {
        return res.status(400).json({ error: 'Faltan datos: nombre_alumno.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO alumno (nombre) VALUES ($1) RETURNING *',
            [nombre_alumno]
        );

        const nuevoAlumno = result.rows[0];
        res.status(201).json({
            message: 'Alumno registrado exitosamente',
            alumno: nuevoAlumno,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al registrar al alumno' });
    }
});

app.post("/obtenerIdAlumno", async (req, res) => {
    console.log(req.body)

    const { nombre_alumno } = req.body; 

    if (!nombre_alumno) {
        return res.status(400).json({ error: 'Faltan datos: nombre_alumno.' });
    }

    try {
        const result = await pool.query(
            'SELECT id FROM alumno WHERE nombre = $1',
            [nombre_alumno]
        );

        const idAlumno = result.rows[0].id;
        res.status(200).json({
            id: idAlumno,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error buscar el alumno' });
    }
});













app.post("/",(req, res) => {
    res.send("Welcome to my first API with Node Js")
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});
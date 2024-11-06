import express from  'express';
import fs from "fs";

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
    res.send("CREAR CLASE")
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
    res.send("OBTENER TODAS LAS CLASES")
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

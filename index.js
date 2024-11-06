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

app.get("/getAllLibros", (req, res) => {
    res.json(readData())
});

app.post("/",(req, res) => {
    res.send("Welcome to my first API with Node Js")
})

app.listen(3000,() => {
    console.log('Server listening on port 3000');
});

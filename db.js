// db.js
const { Pool } = require('pg');  // Importa el paquete `pg`

// Usa la URL de la base de datos desde la variable de entorno `DATABASE_URL`
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Heroku establece automáticamente esta variable de entorno
  ssl: {
    rejectUnauthorized: false,  // Esto es necesario para algunas conexiones SSL en Heroku
  }
});

// Exporta el pool para usarlo en tus rutas
module.exports = pool;

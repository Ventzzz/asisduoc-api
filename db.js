// db.js (archivo de configuración de la base de datos)
import pkg from 'pg';  // Importa todo el paquete `pg` como un objeto
const { Pool } = pkg;  // Desestructuramos `Pool` desde el objeto `pkg`

// Configura el pool de conexiones
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // Usa la URL de la base de datos de Heroku
    ssl: {
        rejectUnauthorized: false  // Habilita SSL en Heroku
    }
});

export default pool;  // Exporta el pool para usarlo en otros archivos

// db.js (archivo de configuración de la base de datos)
import pg from 'pg';  // Importa todo el paquete `pg` como un objeto

// Configura el pool de conexiones
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,  // Usa la URL de la base de datos de Heroku
    ssl: {
        rejectUnauthorized: false  // Habilita SSL en Heroku
    }
});

export default pool;  // Exporta el pool para usarlo en otros archivos

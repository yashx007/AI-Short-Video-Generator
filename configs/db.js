// configs/db.js
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Server-side only environment variable for DB URL
const databaseUrl = process.env.DRIZZLE_DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Database URL is not defined in environment variables");
}

// Initialize the PostgreSQL connection pool
const pool = new Pool({
  connectionString: databaseUrl,
});

// Connect to the database and log the connection status
pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL database');
    client.release(); // Release the client back to the pool
  })
  .catch(err => console.error('Error connecting to the database:', err));

// Export the drizzle instance for use in your application
export const db = drizzle(pool);
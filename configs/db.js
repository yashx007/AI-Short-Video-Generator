// configs/db.js
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

/**
 * Lazy database initializer.
 * We avoid initializing the DB at module import time so Next.js build does not
 * try to connect or throw when environment variables are intentionally absent
 * during build-time. Call `getDb()` from server-only runtime (API routes)
 * to get the `drizzle` instance.
 */

let _db = null;
let _pool = null;

export async function getDb() {
  if (_db) return _db;

  const databaseUrl = process.env.DRIZZLE_DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('Database URL is not defined in environment variables');
  }

  _pool = new Pool({ connectionString: databaseUrl });

  // verify connection (non-blocking but helpful)
  try {
    const client = await _pool.connect();
    client.release();
    console.log('Connected to PostgreSQL database');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }

  _db = drizzle(_pool);
  return _db;
}

// Backwards-compatible named export that throws if used at import-time.
Object.defineProperty(exports, 'db', {
  enumerable: true,
  get() {
    throw new Error('Use getDb() (async) instead of importing `db` directly.');
  },
});
// import { Pool } from 'pg';

// export const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'BonVoyage',
//   password: 'admin',
//   port: 5432,
//   ssl: false, // ⬅️ отключаем SSL
// });
import { Pool } from 'pg';

export const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'BonVoyage',
  password: process.env.DB_PASSWORD || 'admin',
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
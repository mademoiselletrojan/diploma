import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'BonVoyage',
  password: 'admin',
  port: 5432,
  ssl: false, // ⬅️ отключаем SSL
});

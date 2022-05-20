import mysql from 'mysql2/promise';
import 'dotenv/config';

const {
  DB_HOST, DB_PASSWORD, DATABASE, DB_USER,
} = process.env;

export default mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DATABASE,
});

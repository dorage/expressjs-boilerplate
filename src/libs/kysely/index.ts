import { Database } from './types/db'; // this is the Database interface we defined earlier
import { Kysely, SqliteDialect } from 'kysely';
import { sqliteDialect } from '../db/dialect';

const dialect = new SqliteDialect({
  database: sqliteDialect,
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
});

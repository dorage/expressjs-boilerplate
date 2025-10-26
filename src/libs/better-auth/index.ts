import { betterAuth } from 'better-auth';
import { sqliteDialect } from '@/libs/db/dialect';
import { jwt, apiKey, username } from 'better-auth/plugins';

const auth = betterAuth({
  database: sqliteDialect,
  emailAndPassword: { enabled: true },
  plugins: [username(), apiKey(), jwt()],
});

export default auth;

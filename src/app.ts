import express from 'express';
import AuthRouter from '@/libs/better-auth/route';
import OpenAPIRouter from '@/libs/openapi/route';
import HealthRouter from '@/routes/v1/health';
import UserRouter from '@/routes/v1/user';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

const app = express();

app.use(compression());
app.use(helmet());
app.use(morgan('combined'));

// Better-Auth
app.all('/api/auth/{*any}', AuthRouter);

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
// https://www.better-auth.com/docs/integrations/express#mount-the-handler
app.use(express.json());

// Swagger API Document
app.use('/', OpenAPIRouter);

app.use('/v1', HealthRouter);
app.use('/v1', UserRouter);

export { app };

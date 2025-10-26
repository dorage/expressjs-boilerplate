import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { openapiSpecification } from './jsdoc';

const router = express();

router.use('/openapi.json', (_, res) => {
  res.json(openapiSpecification);
});
router.use('/docs', swaggerUi.serve);
router.get(
  '/docs',
  swaggerUi.setup(null, {
    swaggerOptions: { url: '/openapi.json' },
  })
);

export default router;

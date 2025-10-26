import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ExpressJS Boilerplate',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/**/*.ts'],
};

export const openapiSpecification = swaggerJsdoc(options);

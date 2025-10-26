import winston from 'winston';

// RFC5424
// error: 0,
// warn: 1,
// info: 2,
// http: 3,
// verbose: 4,
// debug: 5,
// silly: 6

const isProduction = process.env.NODE_ENV === 'production';

// Docker-friendly logging configuration
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    isProduction
      ? winston.format.json() // JSON format for production (easier for log aggregation)
      : winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(
            ({ timestamp, level, message, ...meta }) =>
              `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`
          )
        )
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    // Console transport for Docker stdout/stderr
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export { logger };

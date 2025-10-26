declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      LOG_LEVEL: string;

      BETTER_AUTH_SECRET: string;
      BETTER_AUTH_URL: string;
    }
  }
}

export {};

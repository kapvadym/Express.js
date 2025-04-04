declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE: string;
      DATABASE_PASSWORD: string;
      PORT?: string;
      NODE_ENV: 'development' | 'production' | 'test';
      SECRET_KEY: string;
    }
  }
}

export {};
export interface ApiEnvironmentConfig {
  nodeEnv: string;
  apiPort: number;
  gpsProvider: string;
  databaseUrl: string;
  realtimeDevAuthToken: string;
  supabaseUrl: string;
  supabaseJwtIssuer: string;
  supabaseJwtAudience: string;
}

export function getEnvConfig(): { app: ApiEnvironmentConfig } {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to initialize the API configuration.');
  }

  return {
    app: {
      nodeEnv: process.env.NODE_ENV ?? 'development',
      apiPort: Number(process.env.API_PORT ?? 4000),
      gpsProvider: process.env.GPS_PROVIDER ?? 'demo',
      databaseUrl: process.env.DATABASE_URL,
      realtimeDevAuthToken: process.env.REALTIME_DEV_AUTH_TOKEN ?? 'paso-a-paso-dev-token',
      supabaseUrl: process.env.SUPABASE_URL ?? 'https://your-project.supabase.co',
      supabaseJwtIssuer: process.env.SUPABASE_JWT_ISSUER ?? 'https://your-project.supabase.co/auth/v1',
      supabaseJwtAudience: process.env.SUPABASE_JWT_AUDIENCE ?? 'authenticated',
    },
  };
}

export interface ApiEnvironmentConfig {
  nodeEnv: string;
  apiPort: number;
  gpsProvider: string;
  databaseUrl: string;
  supabaseUrl: string;
  supabaseJwtIssuer: string;
  supabaseJwtAudience: string;
}

export function getEnvConfig(): { app: ApiEnvironmentConfig } {
  return {
    app: {
      nodeEnv: process.env.NODE_ENV ?? 'development',
      apiPort: Number(process.env.API_PORT ?? 4000),
      gpsProvider: process.env.GPS_PROVIDER ?? 'demo',
      databaseUrl:
        process.env.DATABASE_URL ?? 'postgresql://db-host:5432/pasa_a_paso?schema=public',
      supabaseUrl: process.env.SUPABASE_URL ?? 'https://your-project.supabase.co',
      supabaseJwtIssuer: process.env.SUPABASE_JWT_ISSUER ?? 'https://your-project.supabase.co/auth/v1',
      supabaseJwtAudience: process.env.SUPABASE_JWT_AUDIENCE ?? 'authenticated',
    },
  };
}

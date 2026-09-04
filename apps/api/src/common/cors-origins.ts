const DEFAULT_CORS_ORIGINS = 'http://localhost:3000,http://localhost:3001';

export function getAllowedCorsOrigins(rawOrigins = process.env.API_CORS_ORIGIN ?? DEFAULT_CORS_ORIGINS): string[] {
  return rawOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

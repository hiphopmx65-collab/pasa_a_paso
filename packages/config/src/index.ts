export const BRAND_NAME = 'PASO A PASO';
export const BRAND_TAGLINE = 'CADA PASEO, UN MEJOR DÍA.';
export const COMPANY_LOCATION = 'Comitán, Chiapas';
export const INSTAGRAM_HANDLE = 'paso.a.paso.mx';
export const CONTACT_PHONE = '999 643 6394';

export const API_PREFIX = 'api';
export const API_VERSION = '1';
export const API_V1_PREFIX = `/${API_PREFIX}/v${API_VERSION}`;

export const DEFAULT_DEMO_COORDINATES = {
  latitude: 16.251788,
  longitude: -92.135498,
};

export const TRACKER_SEPARATION_WARNING_METERS = 50;
export const TRACKER_SEPARATION_ALERT_METERS = 100;
export const TRACKER_SEPARATION_DELAY_SECONDS = 20;

export const SOCKET_ROOMS = {
  owner: (ownerId: string) => `owner:${ownerId}`,
  adminGlobal: 'admin:global',
  walker: (walkerId: string) => `walker:${walkerId}`,
  walk: (walkId: string) => `walk:${walkId}`,
} as const;

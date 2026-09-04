export type UserRole = 'OWNER' | 'WALKER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
export type WalkerVerificationStatus = 'PENDING' | 'VERIFIED' | 'SUSPENDED' | 'INACTIVE';
export type WalkStatus =
  | 'REQUESTED'
  | 'CONFIRMED'
  | 'ASSIGNED'
  | 'WALKER_ON_THE_WAY'
  | 'AT_PICKUP'
  | 'DOG_PICKED_UP'
  | 'IN_PROGRESS'
  | 'NEAR_DESTINATION'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'INCIDENT';
export type TrackerProvider = 'DEMO' | 'DIGITAL_MATTER' | 'QUECLINK';
export type TrackerStatus = 'ACTIVE' | 'INACTIVE' | 'OFFLINE' | 'PENDING';
export type SignalStatus = 'OK' | 'LOST';
export type GeofenceStatus = 'INSIDE' | 'OUTSIDE';
export type AlertType =
  | 'TRACKER_OFFLINE'
  | 'LOW_BATTERY'
  | 'DOG_WALKER_SEPARATION'
  | 'GPS_SIGNAL_LOST'
  | 'GEOFENCE_EXIT'
  | 'UNEXPECTED_LOCATION';

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface NormalizedGpsPosition extends Coordinate {
  trackerId: string;
  provider: TrackerProvider;
  accuracyMeters: number;
  speedKph: number;
  headingDegrees: number;
  batteryLevel: number;
  signalStatus: SignalStatus;
  geofenceStatus: GeofenceStatus;
  walkerSeparationMeters: number;
  recordedAt: string;
  source: 'demo' | 'provider';
}

export interface WalkerRealtimePosition extends Coordinate {
  accuracyMeters?: number;
  speedKph?: number;
  headingDegrees?: number;
  recordedAt?: string;
  source?: 'mobile' | 'demo';
}

export interface RealtimeConnectionContext {
  role: UserRole;
  userId?: string;
  walkId?: string;
}

export interface GpsTrackerRequest {
  trackerId: string;
}

export interface GpsProviderCapabilities {
  supportsWebhookIngestion: boolean;
  supportsHistoricalPull: boolean;
  supportsLivePolling: boolean;
}

export interface ApiHealthResponse {
  status: 'ok';
  service: string;
  version: string;
  timestamp: string;
  gpsProvider: string;
}

export function isValidLatitude(value: number): boolean {
  return Number.isFinite(value) && value >= -90 && value <= 90;
}

export function isValidLongitude(value: number): boolean {
  return Number.isFinite(value) && value >= -180 && value <= 180;
}

export function assertValidCoordinate(latitude: number, longitude: number): void {
  if (!isValidLatitude(latitude)) {
    throw new Error(`Invalid latitude: ${latitude}`);
  }

  if (!isValidLongitude(longitude)) {
    throw new Error(`Invalid longitude: ${longitude}`);
  }
}

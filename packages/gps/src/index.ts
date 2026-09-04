import {
  DEFAULT_DEMO_COORDINATES,
  TRACKER_SEPARATION_ALERT_METERS,
  TRACKER_SEPARATION_WARNING_METERS,
} from '@paso-a-paso/config';
import {
  assertValidCoordinate,
  GpsProviderCapabilities,
  GpsTrackerRequest,
  NormalizedGpsPosition,
  TrackerProvider,
} from '@paso-a-paso/types';

export interface GpsProvider {
  readonly provider: TrackerProvider;
  getCapabilities(): GpsProviderCapabilities;
  getPosition(request: GpsTrackerRequest): Promise<NormalizedGpsPosition>;
}

interface DemoTrackerState {
  latitude: number;
  longitude: number;
  headingDegrees: number;
  speedKph: number;
  accuracyMeters: number;
  batteryLevel: number;
  signalLost: boolean;
  geofenceExited: boolean;
  walkerSeparationMeters: number;
  gpsPoweredOn: boolean;
  tick: number;
}

export interface DemoTrackerPatch {
  batteryLevel?: number;
  signalLost?: boolean;
  geofenceExited?: boolean;
  walkerSeparationMeters?: number;
  gpsPoweredOn?: boolean;
  speedKph?: number;
}

export class DemoGpsProvider implements GpsProvider {
  public readonly provider: TrackerProvider = 'DEMO';
  private readonly trackers = new Map<string, DemoTrackerState>();

  getCapabilities(): GpsProviderCapabilities {
    return {
      supportsHistoricalPull: false,
      supportsWebhookIngestion: false,
      supportsLivePolling: true,
    };
  }

  async getPosition({ trackerId }: GpsTrackerRequest): Promise<NormalizedGpsPosition> {
    const state = this.nextState(trackerId);
    assertValidCoordinate(state.latitude, state.longitude);

    return {
      trackerId,
      provider: this.provider,
      latitude: state.latitude,
      longitude: state.longitude,
      accuracyMeters: state.accuracyMeters,
      speedKph: state.gpsPoweredOn && !state.signalLost ? state.speedKph : 0,
      headingDegrees: state.headingDegrees,
      batteryLevel: state.batteryLevel,
      signalStatus: state.signalLost || !state.gpsPoweredOn ? 'LOST' : 'OK',
      geofenceStatus: state.geofenceExited ? 'OUTSIDE' : 'INSIDE',
      walkerSeparationMeters: state.walkerSeparationMeters,
      recordedAt: new Date().toISOString(),
      source: 'demo',
    };
  }

  primeTracker(trackerId: string, patch: DemoTrackerPatch = {}): void {
    this.trackers.set(trackerId, {
      latitude: DEFAULT_DEMO_COORDINATES.latitude,
      longitude: DEFAULT_DEMO_COORDINATES.longitude,
      headingDegrees: 90,
      speedKph: 4.6,
      accuracyMeters: 6,
      batteryLevel: 95,
      signalLost: false,
      geofenceExited: false,
      walkerSeparationMeters: 12,
      gpsPoweredOn: true,
      tick: 0,
      ...patch,
    });
  }

  updateTracker(trackerId: string, patch: DemoTrackerPatch): void {
    const current = this.ensureState(trackerId);
    this.trackers.set(trackerId, { ...current, ...patch });
  }

  private ensureState(trackerId: string): DemoTrackerState {
    if (!this.trackers.has(trackerId)) {
      this.primeTracker(trackerId);
    }

    return this.trackers.get(trackerId)!;
  }

  private nextState(trackerId: string): DemoTrackerState {
    const current = this.ensureState(trackerId);
    const moving = current.gpsPoweredOn && !current.signalLost;
    const nextTick = current.tick + 1;
    const latitude = moving ? current.latitude + 0.00018 : current.latitude;
    const longitude = moving ? current.longitude + 0.00014 : current.longitude;
    const batteryLevel = Math.max(0, Number((current.batteryLevel - 0.4).toFixed(1)));
    const walkerSeparationMeters = current.signalLost
      ? current.walkerSeparationMeters
      : Math.min(current.walkerSeparationMeters + (nextTick % 3 === 0 ? 5 : 0), 160);

    const nextState: DemoTrackerState = {
      ...current,
      latitude,
      longitude,
      batteryLevel,
      walkerSeparationMeters,
      tick: nextTick,
      headingDegrees: current.headingDegrees >= 355 ? 15 : current.headingDegrees + 5,
      speedKph: moving ? current.speedKph : 0,
      accuracyMeters: moving ? 6 : 50,
      geofenceExited:
        current.geofenceExited || walkerSeparationMeters >= TRACKER_SEPARATION_ALERT_METERS,
    };

    this.trackers.set(trackerId, nextState);
    return nextState;
  }
}

abstract class StubProvider implements GpsProvider {
  abstract readonly provider: TrackerProvider;

  getCapabilities(): GpsProviderCapabilities {
    return {
      supportsHistoricalPull: false,
      supportsWebhookIngestion: true,
      supportsLivePolling: false,
    };
  }

  async getPosition(): Promise<NormalizedGpsPosition> {
    throw new Error(
      `${this.provider} provider is a FASE 1 stub. Integrate the real vendor payload/auth flow in a later phase.`,
    );
  }
}

export class DigitalMatterProvider extends StubProvider {
  readonly provider: TrackerProvider = 'DIGITAL_MATTER';
}

export class QueclinkProvider extends StubProvider {
  readonly provider: TrackerProvider = 'QUECLINK';
}

export function getTrackerSeverity(position: NormalizedGpsPosition): 'normal' | 'warning' | 'alert' {
  if (position.walkerSeparationMeters >= TRACKER_SEPARATION_ALERT_METERS || position.signalStatus === 'LOST') {
    return 'alert';
  }

  if (position.walkerSeparationMeters >= TRACKER_SEPARATION_WARNING_METERS) {
    return 'warning';
  }

  return 'normal';
}

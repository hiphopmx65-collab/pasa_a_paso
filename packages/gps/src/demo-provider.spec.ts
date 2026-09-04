import { assertValidCoordinate } from '@paso-a-paso/types';
import { DemoGpsProvider } from './index';

describe('DemoGpsProvider', () => {
  it('returns normalized positions with valid coordinates', async () => {
    const provider = new DemoGpsProvider();
    provider.primeTracker('tracker-demo-1');

    const position = await provider.getPosition({ trackerId: 'tracker-demo-1' });

    expect(position.provider).toBe('DEMO');
    expect(position.source).toBe('demo');
    expect(position.signalStatus).toBe('OK');
    expect(position.batteryLevel).toBeLessThan(95);
    assertValidCoordinate(position.latitude, position.longitude);
  });

  it('can simulate signal loss and preserve the unified contract', async () => {
    const provider = new DemoGpsProvider();
    provider.primeTracker('tracker-demo-2', { signalLost: true, walkerSeparationMeters: 120 });

    const position = await provider.getPosition({ trackerId: 'tracker-demo-2' });

    expect(position.signalStatus).toBe('LOST');
    expect(position.walkerSeparationMeters).toBeGreaterThanOrEqual(120);
    expect(position.geofenceStatus).toBe('OUTSIDE');
  });

  it('validates coordinates', () => {
    expect(() => assertValidCoordinate(16.25, -92.13)).not.toThrow();
    expect(() => assertValidCoordinate(91, -92.13)).toThrow('Invalid latitude: 91');
    expect(() => assertValidCoordinate(16.25, -181)).toThrow('Invalid longitude: -181');
  });
});

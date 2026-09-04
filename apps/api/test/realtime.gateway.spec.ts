import { SOCKET_ROOMS } from '@paso-a-paso/config';
import { RealtimeGateway } from '../src/modules/realtime/realtime.gateway';

describe('RealtimeGateway', () => {
  const originalOrigins = process.env.API_CORS_ORIGIN;

  beforeEach(() => {
    process.env.API_CORS_ORIGIN = 'http://localhost:3000,http://localhost:3001';
  });

  afterAll(() => {
    process.env.API_CORS_ORIGIN = originalOrigins;
  });

  it('publishes tracker positions to owner, walk, and admin rooms', () => {
    const emit = jest.fn();
    const to = jest.fn().mockReturnValue({ emit });
    const gateway = new RealtimeGateway();

    gateway.server = { to } as never;

    gateway.publishTrackerPosition('owner-1', 'walk-1', {
      trackerId: 'tracker-1',
      provider: 'DEMO',
      latitude: 16.25,
      longitude: -92.13,
      accuracyMeters: 6,
      speedKph: 4.2,
      headingDegrees: 90,
      batteryLevel: 94,
      signalStatus: 'OK',
      geofenceStatus: 'INSIDE',
      walkerSeparationMeters: 14,
      recordedAt: new Date().toISOString(),
      source: 'demo',
    });

    expect(to).toHaveBeenNthCalledWith(1, SOCKET_ROOMS.owner('owner-1'));
    expect(to).toHaveBeenNthCalledWith(2, SOCKET_ROOMS.walk('walk-1'));
    expect(to).toHaveBeenNthCalledWith(3, SOCKET_ROOMS.adminGlobal);
    expect(emit).toHaveBeenCalledTimes(3);
    expect(emit).toHaveBeenCalledWith(
      'tracker.position',
      expect.objectContaining({ trackerId: 'tracker-1' }),
    );
  });

  it('publishes walker positions to walker, walk, and admin rooms', () => {
    const emit = jest.fn();
    const to = jest.fn().mockReturnValue({ emit });
    const gateway = new RealtimeGateway();

    gateway.server = { to } as never;

    gateway.publishWalkerPosition('walker-1', 'walk-1', {
      latitude: 16.25,
      longitude: -92.13,
    });

    expect(to).toHaveBeenNthCalledWith(1, SOCKET_ROOMS.walker('walker-1'));
    expect(to).toHaveBeenNthCalledWith(2, SOCKET_ROOMS.walk('walk-1'));
    expect(to).toHaveBeenNthCalledWith(3, SOCKET_ROOMS.adminGlobal);
    expect(emit).toHaveBeenCalledTimes(3);
    expect(emit).toHaveBeenCalledWith(
      'walker.position',
      expect.objectContaining({ latitude: 16.25 }),
    );
  });

  it('rejects realtime connections without a bearer token', () => {
    const disconnect = jest.fn();
    const gateway = new RealtimeGateway();

    gateway.handleConnection({
      id: 'socket-1',
      handshake: {
        headers: {
          origin: 'http://localhost:3000',
        },
      },
      disconnect,
    } as never);

    expect(disconnect).toHaveBeenCalledWith(true);
  });
});

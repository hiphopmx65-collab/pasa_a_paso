# GPS_INTEGRATION

## Objetivo de FASE 1

Preparar una arquitectura GPS desacoplada sin integrar hardware real.

## Contrato unificado

Todas las apps trabajan con `NormalizedGpsPosition` definido en `packages/types`:

- `trackerId`
- `provider`
- `latitude`
- `longitude`
- `accuracyMeters`
- `speedKph`
- `headingDegrees`
- `batteryLevel`
- `signalStatus`
- `geofenceStatus`
- `walkerSeparationMeters`
- `recordedAt`
- `source`

## Providers implementados

### `DemoGpsProvider`
Funcional para pruebas sin hardware:
- simula movimiento del perro
- reduce batería gradualmente
- permite marcar pérdida/recuperación de señal
- permite simular separación perro/paseador
- permite simular salida de geocerca
- usa el mismo contrato que un provider real

### `DigitalMatterProvider`
Stub documentado. No inventa webhook, payload ni autenticación del fabricante.

### `QueclinkProvider`
Stub documentado. No inventa webhook, payload ni autenticación del fabricante.

## Webhook preparado

La integración real prevista es:

`POST /api/v1/gps/webhook`

En FASE 1 el endpoint no se publica porque aún no existe un contrato real de proveedor ni autenticación final.
La normalización queda preparada a nivel de arquitectura mediante el contrato interno `GpsProvider`.

## Realtime

El backend es quien publica eventos normalizados a Socket.IO.
Los frontends consumen siempre el mismo shape, sin depender de si el origen es DEMO o físico.

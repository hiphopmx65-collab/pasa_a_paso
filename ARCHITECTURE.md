# ARCHITECTURE

## FASE 1 implementada

La base del monorepo queda organizada en cuatro apps y cuatro packages:

- `apps/api`: API NestJS versionada en `/api/v1`
- `apps/web-owner`: interfaz base para dueños con Next.js
- `apps/web-admin`: panel base administrativo con Next.js
- `apps/mobile-walker`: app base Expo/React Native para paseadores
- `packages/types`: contratos compartidos del dominio
- `packages/config`: configuración no sensible y constantes compartidas
- `packages/ui`: componentes placeholder reutilizables para web
- `packages/gps`: contrato `GpsProvider` y providers desacoplados

## Decisiones técnicas

### Monorepo
- `pnpm` para workspaces y consistencia de dependencias.
- `turbo` para orquestar build, dev, lint y tests.
- `TypeScript` como lenguaje compartido.

### Backend
- NestJS con módulos `health`, `gps`, `realtime` y `auth` preparados.
- Configuración centralizada vía `@nestjs/config`.
- Prefijo global `/api` y versionado URI (`/v1`).
- Filtro global de errores HTTP y `ValidationPipe`.
- `Socket.IO` preparado mediante `RealtimeGateway`.

### Frontend web
- Dos apps Next.js independientes para separar superficie owner/admin.
- Ambas consumen contrato unificado: el frontend no conoce si el GPS es DEMO o real.
- `packages/ui` aporta componentes visuales base reutilizables.

### Mobile walker
- Expo + React Native para acelerar FASE 1.
- Estructura lista para solicitar permisos de ubicación foreground/background.
- Preparado para usar `expo-location` y `expo-task-manager` en fases posteriores.

## Arquitectura GPS desacoplada

El paquete `packages/gps` define un contrato único:

- `GpsProvider`: interfaz de cualquier proveedor.
- `DemoGpsProvider`: genera posiciones simuladas con el contrato interno normalizado.
- `DigitalMatterProvider`: stub explícito sin payload inventado.
- `QueclinkProvider`: stub explícito sin payload inventado.

El backend expone un provider activo por configuración (`GPS_PROVIDER=demo` por defecto).

## Realtime preparado

Namespace base: `/realtime`

Canales documentados y preparados:
- `owner:{ownerId}`
- `admin:global`
- `walker:{walkerId}`
- `walk:{walkId}`

### Quién publica
- El backend publica posiciones normalizadas del perro (`tracker`) y del paseador (`walker`).
- En FASE 1 no existe ingesta real desde hardware, sólo publicación preparada desde el provider DEMO.

### Quién recibe
- Owner: eventos del paseo y del tracker de sus perros.
- Walker: eventos de su paseo activo.
- Admin: visibilidad operativa global.

### Autenticación prevista
- JWT Supabase validado en handshake Socket.IO.
- La asignación a rooms se hará del lado del backend usando el contexto autenticado; el cliente no decide rooms arbitrarios.
- Mientras no exista validación JWT completa, el gateway sólo acepta conexiones con encabezado `Authorization: ****** y mantiene la segregación de rooms del lado servidor.
- La validación real queda documentada/preparada, no activada todavía por falta de credenciales reales.

## Evolución prevista (fuera de FASE 1)

- CRUDs y casos de uso por dominio.
- Persistencia real de posiciones y alertas en runtime.
- Integración JWT de Supabase completa.
- Webhook GPS real por proveedor con autenticación y anti-replay.

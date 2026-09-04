# Paso a Paso

Monorepo inicial de **FASE 1** para la plataforma de paseos de perros **Paso a Paso**.

> Estado actual: base ejecutable localmente para desarrollo, apps iniciales, contrato GPS desacoplado, provider DEMO funcional y documentación alineada al código real.

## Stack elegido

- **Monorepo:** pnpm + Turborepo + TypeScript
- **API:** NestJS + Socket.IO + Prisma
- **Web Owner:** Next.js + React + TypeScript
- **Web Admin:** Next.js + React + TypeScript
- **Mobile Walker:** Expo + React Native + TypeScript
- **Auth preparado:** Supabase Auth (documentado, sin credenciales reales)
- **DB preparada:** PostgreSQL + Prisma

## Estructura real

```text
apps/
  api/
  mobile-walker/
  web-admin/
  web-owner/
packages/
  config/
  gps/
  types/
  ui/
```

## Lo que sí incluye FASE 1

- Monorepo funcional con workspaces.
- API NestJS con health check en `/api/v1/health`.
- Configuración por variables de entorno.
- Base de manejo de errores y logging del API.
- Gateway base Socket.IO preparado para realtime.
- Prisma schema inicial para PostgreSQL.
- Frontends owner/admin con pantalla inicial funcional.
- App móvil walker base con permisos de ubicación preparados.
- `GpsProvider` abstracto + `DemoGpsProvider` funcional + stubs de fabricantes.
- Tests básicos para health, provider DEMO y validación de coordenadas.

## Lo que **no** incluye todavía

- Integración GPS real.
- Pagos reales.
- WhatsApp real.
- CRUDs completos de negocio.
- JWT Supabase activo con credenciales reales.
- FASE 2 en adelante.

## Requisitos

- Node.js 20+
- pnpm 9+
- PostgreSQL 15+ (para usar Prisma fuera de validación)

## Instalación

```bash
pnpm install
```

## Variables de entorno

Copiar archivos por app:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web-owner/.env.example apps/web-owner/.env.local
cp apps/web-admin/.env.example apps/web-admin/.env.local
cp apps/mobile-walker/.env.example apps/mobile-walker/.env
```

`/.env.example` queda como referencia compartida del workspace; la carga real de FASE 1 se hace desde los archivos de cada app.

## Desarrollo

### Monorepo completo
```bash
pnpm dev
```

### API
```bash
pnpm --filter @paso-a-paso/api dev
```

### Web Owner
```bash
pnpm --filter @paso-a-paso/web-owner dev
```

### Web Admin
```bash
pnpm --filter @paso-a-paso/web-admin dev
```

### Mobile Walker
```bash
pnpm --filter @paso-a-paso/mobile-walker dev
```

## Prisma

```bash
pnpm prisma:format
pnpm prisma:validate
pnpm prisma:generate
```

## Tests

```bash
pnpm test
```

Tests incluidos en FASE 1:
- API health check
- `DemoGpsProvider`
- validación básica de coordenadas GPS

## Documentación adicional

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DATABASE.md](./DATABASE.md)
- [GPS_INTEGRATION.md](./GPS_INTEGRATION.md)
- [SECURITY.md](./SECURITY.md)

## Marca

**PASO A PASO**  
**Eslogan:** CADA PASEO, UN MEJOR DÍA.  
**Ubicación:** Comitán, Chiapas  
**Instagram:** `paso.a.paso.mx`

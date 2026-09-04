# Paso a Paso

Monorepo inicial (FASE 1) para la plataforma de paseos de perros **Paso a Paso**.

> Estado actual: arquitectura base, apps iniciales, contrato GPS abstracto, providers (DEMO + stubs), documentación técnica y ejecución local.

## Stack elegido

- **Monorepo:** Turborepo + pnpm + TypeScript
- **Web Owner:** Next.js (App Router)
- **Web Admin:** Next.js (App Router)
- **Mobile Walker:** Expo + React Native
- **Backend API:** NestJS + TypeScript
- **DB:** PostgreSQL + Prisma (schema inicial, sin migraciones de fase 2 todavía)
- **Auth (plan):** Supabase Auth (JWT)
- **Realtime (plan):** Socket.IO
- **Mapas (plan):** Mapbox
- **Queue/background (plan):** Redis + BullMQ

## Objetivo de FASE 1

1. Dejar monorepo ejecutable localmente.
2. Dejar estructura profesional, modular y escalable.
3. Definir contratos de dominio (roles, estados, flujo base de paseo).
4. Definir arquitectura GPS con `GpsProvider` y adapters independientes:
   - `DemoGpsProvider` (funcional en memoria para pruebas)
   - `DigitalMatterProvider` (stub)
   - `QueclinkProvider` (stub)
5. Entregar documentación base:
   - `ARCHITECTURE.md`
   - `DATABASE.md`
   - `GPS_INTEGRATION.md`
   - `SECURITY.md`

## Requisitos

- Node.js 20+
- pnpm 9+

## Instalación

```bash
pnpm install
```

## Ejecución local

```bash
pnpm dev
```

Servicios esperados:
- Owner web: http://localhost:3000
- Admin web: http://localhost:3001
- API: http://localhost:4000
- Expo Walker: consola con QR (puerto asignado por Expo)

## Variables de entorno

1. Copiar ejemplos:

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web-owner/.env.example apps/web-owner/.env.local
cp apps/web-admin/.env.example apps/web-admin/.env.local
cp apps/mobile-walker/.env.example apps/mobile-walker/.env
```

2. Completar valores según el entorno.

> No colocar secretos reales en repositorio.

## Scripts principales

- `pnpm dev` → levanta apps de desarrollo con turbo
- `pnpm build` → build de todos los paquetes
- `pnpm lint` → lint en workspaces
- `pnpm test` → tests básicos
- `pnpm format` → formatea código

## Alcance de FASE 1 vs pendiente

### Listo en FASE 1
- Monorepo y apps base ejecutables.
- Contratos y tipos compartidos iniciales.
- Módulo GPS de backend con providers desacoplados.
- Endpoint health de API.
- Documentación técnica inicial.

### Pendiente (FASE 2+)
- Modelo Prisma completo y migraciones.
- Auth real y RBAC operativo.
- Flujo completo de paseos.
- Realtime, mapas y tracking persistente.
- OTP/QR, alertas, incidentes, auditoría, pagos mock y tests de integración.

---

**Marca:** PASO A PASO  
**Eslogan:** CADA PASEO, UN MEJOR DÍA.  
**Ubicación:** Comitán, Chiapas

# DATABASE

## Stack
- PostgreSQL
- Prisma ORM

Schema ubicado en `apps/api/prisma/schema.prisma`.

## Alcance FASE 1

Se deja el schema inicial preparado, sin migraciones productivas ni CRUDs completos.

## Modelos incluidos

- `User`
- `OwnerProfile`
- `WalkerProfile`
- `Dog`
- `DogPhoto`
- `DogTracker`
- `Walk`
- `TrackerLocation`
- `WalkerLocation`
- `Alert`
- `Incident`
- `Payment`
- `Notification`
- `AuditLog`

## Principios aplicados

- UUIDs en entidades principales.
- Foreign keys explícitas.
- Índices para consultas de tracking y operaciones por tiempo.
- Separación entre ubicación del tracker del perro y ubicación del paseador.
- `TrackerLocation` y `WalkerLocation` preparados para asociarse a `walkId`.

## Comandos Prisma

```bash
pnpm prisma:format
pnpm prisma:validate
pnpm prisma:generate
```

## Notas

- No se generó migración en esta fase para evitar inventar un entorno local de PostgreSQL en este repositorio vacío.
- `DATABASE_URL` debe apuntar a una instancia PostgreSQL local o remota administrada por el usuario.

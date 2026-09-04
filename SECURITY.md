# SECURITY

## Alcance FASE 1

Se implementa una base de seguridad y se documenta lo pendiente sin usar secretos reales.

## Implementado

- Variables de entorno separadas por app.
- Sin credenciales reales en repositorio.
- Validación básica de configuración del API.
- `ValidationPipe` en NestJS.
- Filtro global de errores HTTP.
- Contrato preparado para JWT de Supabase.
- Separación prevista de canales realtime por rol/contexto.

## Preparado para fases posteriores

### Auth Supabase
Variables esperadas:
- `SUPABASE_URL`
- `SUPABASE_JWT_ISSUER`
- `SUPABASE_JWT_AUDIENCE`

La validación JWT en NestJS se conectará en guard/strategy dedicados cuando existan credenciales reales.

### Webhooks GPS
Se documenta el uso futuro de:
- API key o ****** por proveedor
- HMAC cuando el fabricante lo soporte
- validación de timestamp
- replay protection
- IP allowlist si el proveedor la ofrece

### Realtime
Autenticación prevista mediante JWT en handshake Socket.IO y autorización por rooms resueltos del lado del backend.

## Recomendaciones locales

- Mantener `.env` sólo en desarrollo local.
- Rotar cualquier secreto antes de uso productivo.
- No exponer `GPS_WEBHOOK_SHARED_SECRET` a frontends.

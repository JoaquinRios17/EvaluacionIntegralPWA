# Checklist de seguridad

| Control | Implementado | Dónde |
|---|---|---|
| HTTPS en producción | Sí (lo da Vercel y Render automáticamente) | Despliegue |
| Contraseñas con hash | Sí, `bcryptjs` con 10 rounds | `backend/src/models/user.model.js` |
| Autenticación | JWT firmado con `JWT_SECRET`, expira en 24h | `backend/src/controllers/auth.controller.js` |
| Autorización por rol | Middleware `verificarRol` en rutas de cursos/usuarios | `backend/src/middlewares/role.middleware.js` |
| CORS restringido | Solo permite orígenes de la lista `CORS_ORIGINS` (no `*`) | `backend/src/app.js` |
| Cabeceras HTTP seguras | `helmet()` (X-Content-Type-Options, HSTS, etc.) | `backend/src/app.js` |
| Rate limiting | 300 req/15min general, 20 req/15min en `/api/auth` (anti fuerza bruta) | `backend/src/app.js` |
| Protección XSS almacenado | Middleware que limpia tags HTML/script de `body`, `query`, `params` con `sanitize-html` | `backend/src/middlewares/sanitize.middleware.js` |
| Protección inyección NoSQL | `express-mongo-sanitize` (bloquea operadores `$` en el body) | `backend/src/app.js` |
| Protección HTTP Parameter Pollution | `hpp()` | `backend/src/app.js` |
| Validación de entradas | `express-validator` en registro/login/creación de cursos | `backend/src/middlewares/*Validators.middleware.js` |
| Límite de tamaño del body | `express.json({ limit: "10kb" })` | `backend/src/app.js` |
| Secretos fuera del repo | `.env` en `.gitignore`, se entrega `.env.example` | raíz de cada proyecto |
| CSRF | Riesgo mitigado: el JWT va en header `Authorization`, no en cookies, así que no aplica CSRF clásico (que depende de cookies enviadas automáticamente por el navegador) | Diseño de autenticación |
| Rutas protegidas en frontend | `RutaProtegida` (React), guards `authGuard`/`adminGuard` (Angular) | Cada frontend |

## Pendiente antes de sustentar

- [ ] Correr `npm audit` en `backend`, `frontend-react`, `frontend-next` y `frontend-angular`.
- [ ] Confirmar que las URLs desplegadas usan HTTPS (candado en el navegador).
- [ ] Verificar en modo incógnito que las rutas admin no sean accesibles sin token.
- [ ] Correr Lighthouse contra la URL pública y llenar `docs/lighthouse-report.md`.

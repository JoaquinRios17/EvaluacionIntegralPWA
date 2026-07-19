# Plataforma de Gestión de Cursos e Inscripciones

Proyecto integrador del curso **Programación Web II** (ISIL) — Evaluación Integral Final.

> ⚠️ Antes de entregar: reemplaza todos los campos marcados como `___` (integrantes, URLs
> desplegadas, credenciales reales, enlace de YouTube). Este README es la base, no el final.

## 1. Descripción y problema que resuelve

Muchas instituciones pequeñas gestionan la matrícula de cursos con hojas de cálculo o
formularios sueltos, lo que genera cupos mal contados, inscripciones duplicadas y falta de
visibilidad para administradores. Esta plataforma centraliza ese flujo: un estudiante se
registra, consulta el catálogo, se inscribe en cursos con cupo disponible y puede ver sus
inscripciones activas; un administrador gestiona el catálogo de cursos y las cuentas de
usuario desde un panel separado.

## 2. Objetivos

- Implementar un flujo de negocio completo (registro → catálogo → inscripción → panel
  admin) con persistencia real en MongoDB Atlas.
- Aplicar autenticación JWT y autorización por rol (`administrador`, `docente`, `estudiante`).
- Distribuir responsabilidades entre 3 frontends con propósitos distintos (Next.js para vista
  pública con SSR, React para el portal del estudiante, Angular para el panel admin).
- Aplicar controles básicos de seguridad y desplegar la solución completa en la nube.

## 3. Arquitectura

Ver el detalle y el diagrama en [`docs/arquitectura.md`](docs/arquitectura.md) y el modelo
de datos en [`docs/modelo-de-datos.md`](docs/modelo-de-datos.md).

Resumen:

```
frontend-next     -> Next.js, vista pública / catálogo (SSR)          -> Vercel
frontend-react    -> React + Vite, portal del estudiante (SPA)        -> Vercel
frontend-angular  -> Angular, panel administrativo                    -> Vercel
backend           -> Node.js + Express + Mongoose, API REST           -> Render
MongoDB Atlas     -> persistencia (users, courses, enrollments)       -> Atlas
```

## 4. Tecnologías usadas

- **Backend**: Node.js, Express, Mongoose, JWT, bcryptjs, Helmet, express-rate-limit,
  express-mongo-sanitize, hpp, express-validator, sanitize-html.
- **Frontend React**: React 18, Vite, React Router, Context API, Axios.
- **Frontend Next.js**: Next.js (App Router), TypeScript, SSR.
- **Frontend Angular**: Angular (standalone components), formularios reactivos, guards,
  interceptor HTTP.
- **Base de datos**: MongoDB Atlas.
- **Despliegue**: Vercel (los 3 frontends) + Render (backend).

## 5. Integrantes del equipo

| Nombre completo | Rol / parte principal del proyecto | Usuario de GitHub |
|---|---|---|
| ___________________ | Backend y seguridad | @________ |
| ___________________ | Panel Angular | @________ |
| ___________________ | Portal React | @________ |
| ___________________ | Next.js y documentación | @________ |

## 6. Instalación y ejecución local

Requisitos: Node.js 18+, cuenta de MongoDB Atlas (o Mongo local), 4 terminales (una por
proyecto).

### Backend

```bash
cd backend
cp .env.example .env    # completa MONGODB_URI y JWT_SECRET
npm install
npm run dev              # http://localhost:3000
```

### Frontend React (portal estudiante)

```bash
cd frontend-react
cp .env.example .env
npm install
npm run dev               # http://localhost:5173
```

### Frontend Next.js (vista pública)

```bash
cd frontend-next
cp .env.example .env
npm install
npm run dev               # http://localhost:3000 (usa otro puerto si el backend ya usa el 3000, ej: npm run dev -- -p 3001)
```

### Frontend Angular (panel admin)

```bash
cd frontend-angular
npm install
npm start                 # http://localhost:4200
```

## 7. Variables de entorno

| Proyecto | Variable | Ejemplo |
|---|---|---|
| backend | `MONGODB_URI` | `mongodb+srv://usuario:pass@cluster.mongodb.net/gestion_cursos` |
| backend | `JWT_SECRET` | cadena aleatoria larga |
| backend | `CORS_ORIGINS` | URLs de los 3 frontends separadas por coma |
| frontend-react | `VITE_API_URL` | `https://tu-backend.onrender.com/api` |
| frontend-next | `NEXT_PUBLIC_API_URL` | `https://tu-backend.onrender.com/api` |
| frontend-angular | (editar) `src/environments/environment.prod.ts` | `apiUrl: 'https://tu-backend.onrender.com/api'` |

Cada carpeta tiene su `.env.example`, ninguna tiene el `.env` real subido al repo.

## 8. Credenciales de prueba

> Crea estos usuarios manualmente (vía `POST /api/auth/registro` o desde el panel Angular
> una vez tengas un primer admin) y reemplaza aquí los datos reales antes de entregar.

| Rol | Email | Contraseña |
|---|---|---|
| Administrador | admin@cursos.com | ______ |
| Estudiante | estudiante@cursos.com | ______ |

## 9. Endpoints principales de la API

| Método | Ruta | Protección | Descripción |
|---|---|---|---|
| POST | `/api/auth/registro` | pública | Crea un usuario |
| POST | `/api/auth/login` | pública | Login, devuelve JWT |
| GET | `/api/auth/perfil` | JWT | Perfil del usuario logueado |
| GET | `/api/cursos/publico` | pública | Catálogo de cursos (usado por Next.js) |
| GET | `/api/cursos` | JWT | Listar cursos (autenticado) |
| POST | `/api/cursos` | JWT + admin | Crear curso |
| PUT | `/api/cursos/:id` | JWT + admin | Editar curso |
| DELETE | `/api/cursos/:id` | JWT + admin | Eliminar curso |
| POST | `/api/inscripciones` | JWT | Inscribirse a un curso |
| GET | `/api/inscripciones` | JWT | Ver inscripciones (propias o todas si es admin) |
| DELETE | `/api/inscripciones/:id` | JWT | Cancelar inscripción |
| GET | `/api/usuarios` | JWT + admin | Listar usuarios |
| PUT | `/api/usuarios/:id` | JWT + admin | Editar usuario |
| DELETE | `/api/usuarios/:id` | JWT + admin | Eliminar usuario |

Colección completa lista para importar en Postman: [`docs/postman_collection.json`](docs/postman_collection.json).

## 10. URLs desplegadas

| Frontend/Backend | URL |
|---|---|
| Vista pública (Next.js) | https://______________.vercel.app |
| Portal del estudiante (React) | https://______________.vercel.app |
| Panel administrativo (Angular) | https://______________.vercel.app |
| API (Render) | https://______________.onrender.com |

Guía paso a paso para desplegar: [`docs/despliegue.md`](docs/despliegue.md).

## 11. Capturas de pantalla

> Agregar aquí 3-4 capturas: catálogo público, login, panel admin (cursos), panel admin (usuarios).

## 12. Video de exposición

Enlace de YouTube (no listado o público): https://youtu.be/______________

## 13. Documentación técnica adicional

- [Arquitectura](docs/arquitectura.md)
- [Modelo de datos](docs/modelo-de-datos.md)
- [Checklist de seguridad](docs/checklist-seguridad.md)
- [Reporte Lighthouse](docs/lighthouse-report.md)
- [Guía de despliegue](docs/despliegue.md)
- [Flujo de trabajo en Git](docs/flujo-de-trabajo-git.md)
- [Colección Postman](docs/postman_collection.json)

## 14. Estructura del repositorio

```
.
├── backend/            # API REST (Node + Express + MongoDB)
├── frontend-react/     # Portal del estudiante (SPA)
├── frontend-next/      # Vista pública (SSR)
├── frontend-angular/   # Panel administrativo
└── docs/                # Documentación técnica
```

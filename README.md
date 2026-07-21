# Plataforma de Gestión de Cursos e Inscripciones
Evaluación Integral Final.

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
| Hector Joaquin Rios Hinostroza | Backend y seguridad | https://github.com/JoaquinRios17 |
| | Panel Angular | @________ |
| Santiago Reyes Medina | Portal React | https://github.com/wysson |
| Joustin Edgar Flores Vicente | Next.js y documentación | https://github.com/justin103103 |

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
npm run dev               # http://localhost:3000
```

### Frontend Angular (panel admin)

```bash
cd frontend-angular
npm install
npm start                 # http://localhost:4200
```

## 7. Variables de entorno

| Proyecto | Variable | Ejemplo |
| backend | `MONGODB_URI` | `mongodb+srv://usuario:pass@cluster.mongodb.net/gestion_cursos` |
| backend | `JWT_SECRET` | cadena aleatoria larga |
| backend | `CORS_ORIGINS` | URLs de los 3 frontends separadas por coma |
| frontend-react | `VITE_API_URL` | `https://tu-backend.onrender.com/api` |
| frontend-next | `NEXT_PUBLIC_API_URL` | `https://tu-backend.onrender.com/api` |
| frontend-angular | (editar) `src/environments/environment.prod.ts` | `apiUrl: 'https://tu-backend.onrender.com/api'` |

Cada carpeta tiene su `.env.example`, ninguna tiene el `.env` real subido al repo.

## 8. Credenciales de prueba

| Rol | Email | Contraseña |
| Administrador | admin@gmail.com | admin123 |
| Estudiante | danfer@gmail.com | danfer123 |

## 9. Endpoints principales de la API

| Método | Ruta | Protección | Descripción |
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

| Vista pública (Next.js) | https://evaluacion-integral-pwa.vercel.app |
| Portal del estudiante (React) | https://evaluacion-integral-pwa-6n91.vercel.app |
| Panel administrativo (Angular) | https://evaluacion-integral-pwa-1tzv.vercel.app |
| API (Render) | https://evaluacionintegralpwa.onrender.com |

| Rol | Email | Contraseña |

| Administrador | admin@gmail.com | admin123 |
| Estudiante | danfer@gmail.com | danfer123 |

Guía paso a paso para desplegar: [`docs/despliegue.md`](docs/despliegue.md).

## 11. Capturas de pantalla

<img width="1917" height="618" alt="image" src="https://github.com/user-attachments/assets/8ec41a04-de25-4de3-9af6-559aa607ea33" />
<img width="1867" height="823" alt="image" src="https://github.com/user-attachments/assets/665045ed-4efc-48b6-9afa-aac60efb8698" />
<img width="1915" height="578" alt="image" src="https://github.com/user-attachments/assets/ebe3adc3-75a5-4350-b693-ae4473ef074e" />


## 12. Video de exposición

Enlace de YouTube: 

## 13. Estructura del repositorio

├── backend/            # API REST (Node + Express + MongoDB)
├── frontend-react/     # Portal del estudiante (SPA)
├── frontend-next/      # Vista pública (SSR)
├── frontend-angular/   # Panel administrativo
└── docs/                # Documentación técnica




# Guía de despliegue paso a paso

## 1. MongoDB Atlas

1. Crea una cuenta en https://www.mongodb.com/cloud/atlas y crea un **cluster gratuito (M0)**.
2. En **Database Access**, crea un usuario de base de datos (usuario/contraseña, no el de tu
   cuenta de Atlas) con rol `Read and write to any database`.
3. En **Network Access**, agrega `0.0.0.0/0` (permitir desde cualquier IP) — es lo más simple
   para que Render pueda conectarse. Para producción "real" se restringiría más, pero para el
   curso esto es aceptable.
4. En **Database > Connect > Drivers**, copia el connection string. Se ve así:
   `mongodb+srv://usuario:<password>@cluster0.xxxxx.mongodb.net/gestion_cursos?retryWrites=true&w=majority`
5. Reemplaza `<password>` por la contraseña real del usuario de base de datos. Guarda esta
   URL, la vas a necesitar en el paso 2.

## 2. Backend en Render

1. Sube el código del backend a GitHub (dentro del monorepo, carpeta `backend/`).
2. En https://render.com, crea un **New Web Service** y conecta tu repo de GitHub.
3. Configuración del servicio:
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. En la pestaña **Environment**, agrega las variables (mismas del `.env.example`):
   - `PORT` → `10000` (Render asigna su propio puerto, pero déjalo por si acaso)
   - `MONGODB_URI` → el connection string del paso 1
   - `JWT_SECRET` → una clave larga y aleatoria (no uses `claveSecreta123` en producción)
   - `CORS_ORIGINS` → de momento déjalo vacío o con `http://localhost:5173`, lo vas a
     actualizar en el paso 4 con las URLs reales de Vercel.
5. Deploy. Cuando termine, Render te da una URL tipo `https://gestion-cursos-api.onrender.com`.
6. Prueba en el navegador: `https://gestion-cursos-api.onrender.com/` debe responder el JSON
   de bienvenida.

> Nota: en el plan gratuito de Render, el backend "duerme" tras un rato de inactividad y la
> primera petición tarda unos segundos en responder. Es normal, no es un error.

## 3. Frontend Next.js en Vercel (vista pública)

1. En https://vercel.com, **Add New Project**, importa el repo, y en **Root Directory**
   selecciona `frontend-next`.
2. Framework Preset: Next.js (se detecta solo).
3. En **Environment Variables**, agrega:
   - `NEXT_PUBLIC_API_URL` → `https://gestion-cursos-api.onrender.com/api`
4. Deploy. Te da una URL tipo `https://gestion-cursos-publico.vercel.app`.

## 4. Frontend React (portal del estudiante) en Vercel

1. Nuevo proyecto en Vercel, **Root Directory**: `frontend-react`.
2. Framework Preset: Vite.
3. **Build Command**: `npm run build`, **Output Directory**: `dist`.
4. Variable de entorno:
   - `VITE_API_URL` → `https://gestion-cursos-api.onrender.com/api`
5. Deploy. URL tipo `https://gestion-cursos-estudiante.vercel.app`.

## 5. Frontend Angular (panel admin) en Vercel

1. Nuevo proyecto en Vercel, **Root Directory**: `frontend-angular`.
2. Antes de desplegar, edita `src/environments/environment.prod.ts` y pon la URL real del
   backend de Render en `apiUrl`.
3. **Build Command**: `npm run build`, **Output Directory**: `dist/frontend-angular/browser`.
4. Deploy. URL tipo `https://gestion-cursos-admin.vercel.app`.

## 6. Cerrar el círculo: actualizar CORS

1. Vuelve a Render, entra a las variables de entorno del backend.
2. Actualiza `CORS_ORIGINS` con las 3 URLs reales de Vercel, separadas por coma, **sin
   slash final**:
   ```
   CORS_ORIGINS=https://gestion-cursos-publico.vercel.app,https://gestion-cursos-estudiante.vercel.app,https://gestion-cursos-admin.vercel.app
   ```
3. Guarda: Render va a redesplegar el servicio automáticamente.

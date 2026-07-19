# Flujo de trabajo en Git (para que el repo refleje la participación real del equipo)

El profesor descontó puntos porque el repositorio anterior solo mostraba commits de un
integrante. Para la Evaluación Integral usamos este flujo, con las 4 personas comprometidas
a commitear su propio trabajo (nadie sube el código de otro en su nombre):

## 1. Reparto de trabajo por rama

| Integrante | Rama sugerida | Parte del proyecto |
|---|---|---|
| Integrante 1 | `feature/backend-seguridad` | Middlewares de seguridad, validaciones, hardening de `app.js` |
| Integrante 2 | `feature/angular-admin` | Panel Angular (cursos + usuarios) |
| Integrante 3 | `feature/react-portal` | Ajustes del portal del estudiante, Context API |
| Integrante 4 | `feature/next-ssr-docs` | Vista pública Next.js + documentación técnica |

## 2. Reglas mínimas de commits

- Cada quien trabaja en su propia rama y hace **commits pequeños y frecuentes** (no un solo
  commit gigante al final). Ejemplos de buenos mensajes:
  - `feat(backend): agrega helmet y rate limiting`
  - `feat(angular): crea CRUD de cursos con formularios reactivos`
  - `fix(react): corrige logout en AuthContext`
  - `docs: agrega diagrama de arquitectura`
- Antes de hacer `merge` a `main`, cada integrante abre un Pull Request y otro integrante lo
  revisa (aunque sea rápido) — esto también queda registrado como evidencia de colaboración.

## 3. Configurar tu identidad de Git (importante)

Cada integrante debe verificar que sus commits queden con su propio nombre/correo, no con el
de otro compañero ni con una cuenta genérica:

```bash
git config user.name "Tu Nombre"
git config user.email "tu_correo_real@ejemplo.com"
```

## 4. Verificación antes de entregar

En GitHub, entrar a la pestaña **Insights > Contributors** del repo y confirmar que aparecen
los 4 integrantes con commits distribuidos en el tiempo (no todos el mismo día a la misma hora).

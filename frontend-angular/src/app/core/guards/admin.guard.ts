import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// ademas de estar logueado, exige que el rol sea administrador
// (docente/estudiante no deberian entrar al CRUD de cursos/usuarios)
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.estaAutenticado() && authService.esAdministrador()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RespuestaLogin, Usuario } from '../models/usuario.model';

// maneja login, logout y el estado de la sesion del admin/docente que usa el panel
@Injectable({ providedIn: 'root' })
export class AuthService {
  private urlBase = `${environment.apiUrl}/auth`;

  // signal con el usuario actual, se usa en el navbar y en los guards
  usuarioActual = signal<Usuario | null>(this.leerUsuarioGuardado());

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(`${this.urlBase}/login`, { email, password }).pipe(
      tap((respuesta) => {
        localStorage.setItem('adminToken', respuesta.token);
        localStorage.setItem('adminUsuario', JSON.stringify(respuesta.usuario));
        this.usuarioActual.set(respuesta.usuario);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsuario');
    this.usuarioActual.set(null);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('adminToken');
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  esAdministrador(): boolean {
    return this.usuarioActual()?.rol === 'administrador';
  }

  private leerUsuarioGuardado(): Usuario | null {
    const guardado = localStorage.getItem('adminUsuario');
    return guardado ? JSON.parse(guardado) : null;
  }
}

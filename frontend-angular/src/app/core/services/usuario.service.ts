import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private urlUsuarios = `${environment.apiUrl}/usuarios`;
  private urlAuth = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  listar(): Observable<{ total: number; usuarios: Usuario[] }> {
    return this.http.get<{ total: number; usuarios: Usuario[] }>(this.urlUsuarios);
  }

  // el admin crea usuarios reutilizando el endpoint de registro
  crear(usuario: Usuario): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.urlAuth}/registro`, usuario);
  }

  actualizar(id: string, usuario: Partial<Usuario>): Observable<{ mensaje: string; usuario: Usuario }> {
    return this.http.put<{ mensaje: string; usuario: Usuario }>(`${this.urlUsuarios}/${id}`, usuario);
  }

  eliminar(id: string): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.urlUsuarios}/${id}`);
  }
}

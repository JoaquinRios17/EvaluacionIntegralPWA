import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Curso } from '../models/curso.model';

@Injectable({ providedIn: 'root' })
export class CursoService {
  private urlBase = `${environment.apiUrl}/cursos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<{ total: number; cursos: Curso[] }> {
    return this.http.get<{ total: number; cursos: Curso[] }>(this.urlBase);
  }

  obtener(id: string): Observable<{ curso: Curso }> {
    return this.http.get<{ curso: Curso }>(`${this.urlBase}/${id}`);
  }

  crear(curso: Curso): Observable<{ mensaje: string; curso: Curso }> {
    return this.http.post<{ mensaje: string; curso: Curso }>(this.urlBase, curso);
  }

  actualizar(id: string, curso: Curso): Observable<{ mensaje: string; curso: Curso }> {
    return this.http.put<{ mensaje: string; curso: Curso }>(`${this.urlBase}/${id}`, curso);
  }

  eliminar(id: string): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.urlBase}/${id}`);
  }
}

export interface Curso {
  _id?: string;
  nombre: string;
  descripcion: string;
  creditos: number;
  cupoMaximo: number;
  estado?: 'activo' | 'inactivo';
}

export type RolUsuario = 'administrador' | 'docente' | 'estudiante';

export interface Usuario {
  _id?: string;
  nombre: string;
  email: string;
  password?: string;
  rol: RolUsuario;
}

export interface RespuestaLogin {
  mensaje: string;
  token: string;
  usuario: Usuario;
}

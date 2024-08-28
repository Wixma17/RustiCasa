export interface RequestCliente {
  gmail: string;
  nombre?: string;
  apellido?: string;
  passwd: string;
  nickname: string;
  administrador?: boolean;
  fechaNacimiento: Date;
}

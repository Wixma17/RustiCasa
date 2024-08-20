import { MunicipioResponse } from "./municipio-response.model"

export interface CasaResponse {
  idCasa: number,
  descripcion: string,
  nombreCasa: string,
  mascotas: boolean,
  precioNoche: number,
  numeroHabitaciones: number,
  numeroInquilinos: number,
  piscina: boolean,
  wifi: boolean,
  jardin: boolean
  municipio: MunicipioResponse
}

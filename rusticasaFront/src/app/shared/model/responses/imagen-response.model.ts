import { SafeResourceUrl } from "@angular/platform-browser";

export interface ImagenResponse {
  idImagen: number,
  rutaImagen: string,
  posicionCarrusel: number,
  safeUrl?: SafeResourceUrl
}

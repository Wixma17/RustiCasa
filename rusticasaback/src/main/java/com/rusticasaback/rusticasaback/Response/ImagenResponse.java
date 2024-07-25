package com.rusticasaback.rusticasaback.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImagenResponse {
    private Long idImagen;
    private String rutaImagen;
    private int posicionCarrusel;
}

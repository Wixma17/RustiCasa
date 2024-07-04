package com.rusticasaback.rusticasaback.Response;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
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
    private String nombreImagen;
    private int posicionCarrusel;
    private CasaEntity casa;
}

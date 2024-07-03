package com.rusticasaback.rusticasaback.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CasaResponse {
    private Long id_casa;
    private String descripcion;
    private String nombre_casa;
    private boolean mascotas;
}

package com.rusticasaback.rusticasaback.Response;
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

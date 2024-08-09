package com.rusticasaback.rusticasaback.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OpinionResponse {
    private Long idCasa;
    private String gmail;
    private String textoOpinion;
    private double puntuacion;
}

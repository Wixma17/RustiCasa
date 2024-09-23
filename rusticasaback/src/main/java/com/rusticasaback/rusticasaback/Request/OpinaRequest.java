package com.rusticasaback.rusticasaback.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpinaRequest {
    private String gmail;
    private Long idCasa;
    private String textoOpinion;
    private Double puntuacion;    
}

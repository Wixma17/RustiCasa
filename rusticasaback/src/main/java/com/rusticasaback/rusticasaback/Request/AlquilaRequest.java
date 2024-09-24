package com.rusticasaback.rusticasaback.Request;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlquilaRequest {
    private String gmail;  
    private Long idCasa;
    private Date fechaEntrada;
    private Date fechaSalida;
}

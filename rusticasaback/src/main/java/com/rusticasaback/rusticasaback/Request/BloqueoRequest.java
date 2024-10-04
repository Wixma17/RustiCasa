package com.rusticasaback.rusticasaback.Request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BloqueoRequest {
    private String gmailBloqueado;    
    private String motivo;
}

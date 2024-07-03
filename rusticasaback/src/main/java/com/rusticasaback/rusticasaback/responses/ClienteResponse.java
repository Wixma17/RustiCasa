package com.rusticasaback.rusticasaback.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClienteResponse {
    private String nickname;
    private String gmail;
    private String passwd;
    private String nombre;
    private String apellido;
    private boolean administrador;    
}

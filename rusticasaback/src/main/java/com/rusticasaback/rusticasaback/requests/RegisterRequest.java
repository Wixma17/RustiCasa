package com.rusticasaback.rusticasaback.requests;

import java.util.Date;

import lombok.Data;

@Data
public class RegisterRequest {
    private String nickname;
    private String nombre_usuario;
    private String apellido_usuario;
    private String passwd;
    private String repetir_passwd;
    private String gmail;
    private boolean administrador;
    private Date fecha_nacimiento;
}

package com.rusticasaback.rusticasaback.Request;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String gmail;
    private String nombre = "";
    private String apellido = "";
    private String passwd;
    private String nickname;
    private boolean administrador = false;
    private Date fechaNacimiento;
}

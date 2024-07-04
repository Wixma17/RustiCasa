package com.rusticasaback.rusticasaback.Request;

import java.util.Date;
import java.util.List;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.MensajeEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntity;
import lombok.Data;

@Data
public class RegisterRequest {
    private String gmail;
    private String nombre;
    private String apellido;
    private String passwd;
    private String nickname;
    private boolean administrador;
    private Date fechaNacimiento;
    private List<MensajeEntity> listaMensajeEnviados;
    private List<MensajeEntity> listaMensajeRecibidos;
    private List<CasaEntity> listaCasaPublicadas;
    private List<AlquilaEntity> listaAlquilados;
    private List<OpinaEntity> listaClienteOpinion; 
}

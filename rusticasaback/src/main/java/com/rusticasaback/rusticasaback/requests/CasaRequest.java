package com.rusticasaback.rusticasaback.requests;

import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import lombok.Data;

@Data
public class CasaRequest {
    private Long id_casa;
    private String descripcion;
    private String nombre_casa;
    private boolean mascotas;
    private ClienteEntity cliente;
}

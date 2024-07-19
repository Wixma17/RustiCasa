package com.rusticasaback.rusticasaback.Request;

import com.rusticasaback.rusticasaback.DTOs.MensajeDTO;

import lombok.Data;

@Data
public class MensajeRequest {
    private MensajeDTO mensajeDTO;
    private String codEmisor;
    private String codReceptor;
}

package com.rusticasaback.rusticasaback.DTOs;

import com.rusticasaback.rusticasaback.entities.MensajeEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MensajeDTO {
    private Long idMensaje;
    private String textoMensaje;

    public MensajeDTO(MensajeEntity mensajeEntity) {
        idMensaje = mensajeEntity.getIdMensaje();
        textoMensaje = mensajeEntity.getTextoMensaje();
    }

    public MensajeEntity createMensajeEntity() {
        return new MensajeEntity(idMensaje, textoMensaje, null, null);
    }
}

package com.rusticasaback.rusticasaback.DTOs;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
    private Date fechaMensaje;

    public MensajeDTO(MensajeEntity mensajeEntity) {
        idMensaje = mensajeEntity.getIdMensaje();
        textoMensaje = mensajeEntity.getTextoMensaje();
        fechaMensaje = mensajeEntity.getFechaMensaje();
    }

    public MensajeEntity createMensajeEntity() {
        return new MensajeEntity(idMensaje, textoMensaje, fechaMensaje, null, null);
    }

    public static MensajeEntity createMensajeEntity(MensajeDTO men) {
        return new MensajeEntity(men.idMensaje, men.textoMensaje, men.fechaMensaje, null, null);
    }

    public static List<MensajeEntity> convertFromDtoList(List<MensajeDTO> listaDTO) {
        List<MensajeEntity> listaEntity = new ArrayList<>();
        listaDTO.forEach(al -> listaEntity.add(createMensajeEntity(al)));
        return listaEntity;
    }

    public static List<MensajeDTO> convertFromEntityList(List<MensajeEntity> listaEntity) {
        List<MensajeDTO> listaDTO = new ArrayList<>();
        listaEntity.forEach(al -> listaDTO.add(new MensajeDTO(al)));
        return listaDTO;
    }
}

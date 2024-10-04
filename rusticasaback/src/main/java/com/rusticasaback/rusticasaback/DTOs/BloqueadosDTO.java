package com.rusticasaback.rusticasaback.DTOs;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.rusticasaback.rusticasaback.entities.BloqueadosEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BloqueadosDTO {
    private String gmailBloqueado;
    private Date fechaBloqueo;
    private String motivo;

    public BloqueadosDTO(BloqueadosEntity bloqueadosEntity) {
        gmailBloqueado = bloqueadosEntity.getGmailBloqueado();
        fechaBloqueo = bloqueadosEntity.getFechaBloqueo();
        motivo = bloqueadosEntity.getMotivo();
    }

    public BloqueadosEntity createBloqueadoEntity(){
        return new BloqueadosEntity(gmailBloqueado, fechaBloqueo, motivo, null);
    }

    public static BloqueadosEntity createBloqueadosEntity(BloqueadosDTO bloqueado){
        return new BloqueadosEntity(bloqueado.getGmailBloqueado(),bloqueado.getFechaBloqueo(),bloqueado.getMotivo(),null);
    }

    public static List<BloqueadosEntity> convertFromDtoList(List<BloqueadosDTO> listaDTO) {
        List<BloqueadosEntity> listaEntity = new ArrayList<>();
        listaDTO.forEach(al -> listaEntity.add(createBloqueadosEntity(al)));
        return listaEntity;
    }

    public static List<BloqueadosDTO> convertFromEntityList(List<BloqueadosEntity> listaEntity) {
        List<BloqueadosDTO> listaDTO = new ArrayList<>();
        listaEntity.forEach(al -> listaDTO.add(new BloqueadosDTO(al)));
        return listaDTO;
    }
}

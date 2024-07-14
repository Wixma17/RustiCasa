package com.rusticasaback.rusticasaback.DTOs;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntityPK;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlquilaDTO {
    private AlquilaEntityPK alquilaEntityPK;
    private Date fechaSalida;

    public AlquilaDTO(AlquilaEntity alquilaEntity) {
        alquilaEntityPK = alquilaEntity.getAlquilaEntityPK();
        fechaSalida = alquilaEntity.getFechaSalida();
    }

    public AlquilaEntity createAlquilaEntity(){
        return new AlquilaEntity(alquilaEntityPK, fechaSalida, null, null);
    }

    public static AlquilaEntity createAlquilaEntity(AlquilaDTO alquila){
        return new AlquilaEntity(alquila.alquilaEntityPK, alquila.fechaSalida, null, null);
    }

    public static List<AlquilaEntity> convertFromDtoList(List<AlquilaDTO> listaDTO) {
        List<AlquilaEntity> listaEntity = new ArrayList<>();
        listaDTO.forEach(al -> listaEntity.add(createAlquilaEntity(al)));
        return listaEntity;
    }

    public static List<AlquilaDTO> convertFromEntityList(List<AlquilaEntity> listaEntity) {
        List<AlquilaDTO> listaDTO = new ArrayList<>();
        listaEntity.forEach(al -> listaDTO.add(new AlquilaDTO(al)));
        return listaDTO;
    }
}

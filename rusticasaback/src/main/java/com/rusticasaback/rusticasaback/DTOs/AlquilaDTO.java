package com.rusticasaback.rusticasaback.DTOs;

import java.util.Date;

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
}

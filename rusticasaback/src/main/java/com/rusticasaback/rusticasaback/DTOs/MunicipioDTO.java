package com.rusticasaback.rusticasaback.DTOs;

import com.rusticasaback.rusticasaback.entities.MunicipioEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MunicipioDTO {
    private int idMunicipio;
    private String municipio;
    private String municipioseo;
    private int postal;
    private double latitud;
    private double longitud;

    public MunicipioDTO(MunicipioEntity municipioEntity) {
        idMunicipio = municipioEntity.getIdMunicipio();
        municipio = municipioEntity.getMunicipio();
        municipioseo = municipioEntity.getMunicipioseo();
        postal = municipioEntity.getPostal();
        latitud = municipioEntity.getLatitud();
        longitud = municipioEntity.getLongitud();
    }

    public MunicipioEntity createMunicipioEntity(){
        return new MunicipioEntity(idMunicipio, municipio, municipioseo, postal, latitud, longitud, null, null);
    }
}

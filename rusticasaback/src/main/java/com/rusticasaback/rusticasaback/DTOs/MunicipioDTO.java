package com.rusticasaback.rusticasaback.DTOs;

import java.util.ArrayList;
import java.util.List;
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

    public static MunicipioEntity createMunicipioEntity(MunicipioDTO mun){
        return new MunicipioEntity(mun.idMunicipio, mun.municipio, mun.municipioseo, mun.postal, mun.latitud, mun.longitud, null, null);
    }

    public static List<MunicipioEntity> convertFromDtoList(List<MunicipioDTO> listaDTO) {
        List<MunicipioEntity> listaEntity = new ArrayList<>();
        listaDTO.forEach(al -> listaEntity.add(createMunicipioEntity(al)));
        return listaEntity;
    }

    public static List<MunicipioDTO> convertFromEntityList(List<MunicipioEntity> listaEntity) {
        List<MunicipioDTO> listaDTO = new ArrayList<>();
        listaEntity.forEach(al -> listaDTO.add(new MunicipioDTO(al)));
        return listaDTO;
    }
}

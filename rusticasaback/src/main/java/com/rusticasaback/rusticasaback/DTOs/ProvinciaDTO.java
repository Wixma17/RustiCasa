package com.rusticasaback.rusticasaback.DTOs;

import java.util.ArrayList;
import java.util.List;
import com.rusticasaback.rusticasaback.entities.ProvinciaEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProvinciaDTO {
    private int idPronvincia;
    private String nombreProvincia;
    private String nombreProvinciaSeo;
    private String nombreProvincia3;
    private String comunidad;

    public ProvinciaDTO(ProvinciaEntity provinciaEntity) {
        idPronvincia = provinciaEntity.getIdProvincia();
        nombreProvincia = provinciaEntity.getNombreProvincia();
        nombreProvinciaSeo = provinciaEntity.getNombreProvinciaSeo();
        nombreProvincia3 = provinciaEntity.getNombreProvincia3();
        comunidad = provinciaEntity.getComunidad();
    }

    public ProvinciaEntity createProvinciaEntity() {
        return new ProvinciaEntity(idPronvincia, nombreProvincia, nombreProvinciaSeo, nombreProvincia3, comunidad,
                null);
    }

    public static ProvinciaEntity createProvinciaEntity(ProvinciaDTO prov) {
        return new ProvinciaEntity(prov.idPronvincia, prov.nombreProvincia, prov.nombreProvinciaSeo,
                prov.nombreProvincia3, prov.comunidad, null);
    }

    public static List<ProvinciaEntity> convertFromDtoList(List<ProvinciaDTO> listaDTO) {
        List<ProvinciaEntity> listaEntity = new ArrayList<>();
        listaDTO.forEach(al -> listaEntity.add(createProvinciaEntity(al)));
        return listaEntity;
    }

    public static List<ProvinciaDTO> convertFromEntityList(List<ProvinciaEntity> listaEntity) {
        List<ProvinciaDTO> listaDTO = new ArrayList<>();
        listaEntity.forEach(al -> listaDTO.add(new ProvinciaDTO(al)));
        return listaDTO;
    }
}

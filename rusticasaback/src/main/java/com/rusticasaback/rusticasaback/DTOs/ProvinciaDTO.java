package com.rusticasaback.rusticasaback.DTOs;

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
        idPronvincia = provinciaEntity.getIdPronvincia();
        nombreProvincia = provinciaEntity.getNombreProvincia();
        nombreProvinciaSeo = provinciaEntity.getNombreProvinciaSeo();
        nombreProvincia3 = provinciaEntity.getNombreProvincia3();
        comunidad = provinciaEntity.getComunidad();
    }

    public ProvinciaEntity createProvinciaEntity(){
        return new ProvinciaEntity(idPronvincia, nombreProvincia, nombreProvinciaSeo, nombreProvincia3, comunidad, null);
    }
}

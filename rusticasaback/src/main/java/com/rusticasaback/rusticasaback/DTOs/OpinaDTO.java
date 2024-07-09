package com.rusticasaback.rusticasaback.DTOs;

import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntityPK;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class OpinaDTO {
    private OpinaEntityPK opinaEntityPK;
    private String textoOpinion;

    public OpinaDTO(OpinaEntity opinaEntity) {
        opinaEntityPK = opinaEntity.getOpinaEntityPK();
        textoOpinion = opinaEntity.getTextoOpinion();
    }

    public OpinaEntity createOpinaEntity(){
        return new OpinaEntity(opinaEntityPK, textoOpinion, null, null);
    }
}

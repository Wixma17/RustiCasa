package com.rusticasaback.rusticasaback.DTOs;

import java.util.ArrayList;
import java.util.List;
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

    public OpinaEntity createOpinaEntity() {
        return new OpinaEntity(opinaEntityPK, textoOpinion, null, null);
    }

    public static OpinaEntity createOpinaEntity(OpinaDTO op) {
        return new OpinaEntity(op.opinaEntityPK, op.textoOpinion, null, null);
    }

    public static List<OpinaEntity> convertFromDtoList(List<OpinaDTO> listaDTO) {
        List<OpinaEntity> listaEntity = new ArrayList<>();
        listaDTO.forEach(al -> listaEntity.add(createOpinaEntity(al)));
        return listaEntity;
    }

    public static List<OpinaDTO> convertFromEntityList(List<OpinaEntity> listaEntity) {
        List<OpinaDTO> listaDTO = new ArrayList<>();
        listaEntity.forEach(al -> listaDTO.add(new OpinaDTO(al)));
        return listaDTO;
    }
}

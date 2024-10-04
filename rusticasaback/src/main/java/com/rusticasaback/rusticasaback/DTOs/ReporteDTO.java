package com.rusticasaback.rusticasaback.DTOs;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.rusticasaback.rusticasaback.entities.ReporteEntity;
import com.rusticasaback.rusticasaback.entities.ReporteEntityPK;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReporteDTO {
    private ReporteEntityPK reporteEntityPK;   
    private Date fechaReporte;
    private String motivo;
    

    public ReporteDTO(ReporteEntity reporteEntity) {
        reporteEntityPK = reporteEntity.getReporteEntityPK();
        fechaReporte = reporteEntity.getFechaReporte();
        motivo = reporteEntity.getMotivo();
    }

    public ReporteEntity createReporteEntity(){
        return new ReporteEntity(reporteEntityPK,fechaReporte, motivo,null,null);
    }

    public static ReporteEntity createReporteEntity(ReporteDTO reportado){
        return new ReporteEntity(reportado.getReporteEntityPK(),reportado.getFechaReporte(),reportado.getMotivo(),null,null);
    }

    public static List<ReporteEntity> convertFromDtoList(List<ReporteDTO> listaDTO) {
        List<ReporteEntity> listaEntity = new ArrayList<>();
        listaDTO.forEach(al -> listaEntity.add(createReporteEntity(al)));
        return listaEntity;
    }

    public static List<ReporteDTO> convertFromEntityList(List<ReporteEntity> listaEntity) {
        List<ReporteDTO> listaDTO = new ArrayList<>();
        listaEntity.forEach(al -> listaDTO.add(new ReporteDTO(al)));
        return listaDTO;
    }
}

package com.rusticasaback.rusticasaback.DTOs;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.rusticasaback.rusticasaback.entities.ReporteEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReporteDTO {
    private String gmail;
    private int nReportes;    
    private Date fechaReporte;
    private String motivo;

    public ReporteDTO(ReporteEntity reporteEntity) {
        gmail = reporteEntity.getGmail();
        nReportes = reporteEntity.getNReportes();
        fechaReporte = reporteEntity.getFechaReporte();
        motivo = reporteEntity.getMotivo();
    }

    public ReporteEntity createBloqueadoEntity(){
        return new ReporteEntity(gmail, nReportes, fechaReporte, motivo,null,null);
    }

    public static ReporteEntity createBloqueadosEntity(ReporteDTO reportado){
        return new ReporteEntity(reportado.getGmail(),reportado.getNReportes(),reportado.getFechaReporte(),reportado.getMotivo(),null,null);
    }

    public static List<ReporteEntity> convertFromDtoList(List<ReporteDTO> listaDTO) {
        List<ReporteEntity> listaEntity = new ArrayList<>();
        listaDTO.forEach(al -> listaEntity.add(createBloqueadosEntity(al)));
        return listaEntity;
    }

    public static List<ReporteDTO> convertFromEntityList(List<ReporteEntity> listaEntity) {
        List<ReporteDTO> listaDTO = new ArrayList<>();
        listaEntity.forEach(al -> listaDTO.add(new ReporteDTO(al)));
        return listaDTO;
    }
}

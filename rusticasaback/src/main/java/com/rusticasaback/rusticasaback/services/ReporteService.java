package com.rusticasaback.rusticasaback.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rusticasaback.rusticasaback.entities.ReporteEntity;
import com.rusticasaback.rusticasaback.entities.ReporteEntityPK;
import com.rusticasaback.rusticasaback.repositories.ReporteRepository;

@Service
public class ReporteService {
    @Autowired
    private ReporteRepository reporteRepository;

    // Método para crear un nuevo reporte
    public ReporteEntity crearReporte(ReporteEntity reporteEntity) {
        return reporteRepository.save(reporteEntity);
    }

    // Método para contar reportes por el Gmail de un cliente reportado
    public int contarReportesPorGmail(String gmail) {
        return reporteRepository.countReportesByGmail(gmail);
    }

    // Método para encontrar todos los reportes hacia un usuario específico
    public List<ReporteEntity> obtenerReportesPorCliente(String clienteReportadoGmail) {
        return reporteRepository.findByClienteReportado_Gmail(clienteReportadoGmail);
    }

    // Método para encontrar un reporte por su clave primaria
    public ReporteEntity obtenerReportePorId(ReporteEntityPK id) {
        return reporteRepository.findById(id).orElse(null);
    }

    // Método para eliminar un reporte (si es necesario)
    public void eliminarReporte(ReporteEntityPK id) {
        reporteRepository.deleteById(id);
    }


}

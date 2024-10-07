package com.rusticasaback.rusticasaback.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rusticasaback.rusticasaback.DTOs.ReporteDTO;
import com.rusticasaback.rusticasaback.Request.ReporteRequest;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.entities.ReporteEntity;
import com.rusticasaback.rusticasaback.entities.ReporteEntityPK;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;
import com.rusticasaback.rusticasaback.repositories.ReporteRepository;

import jakarta.transaction.Transactional;

@Service
public class ReporteService {
    @Autowired
    private ReporteRepository reporteRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    // Método para crear un nuevo reporte
    public ReporteEntity guardarReporte(ReporteEntity reporteEntity) {
        return reporteRepository.save(reporteEntity);
    }

    //metodo para crear un reporte
    public ResponseEntity<?> crearReporte(ReporteRequest request){

        ClienteEntity cliRepor= clienteRepository.findById(request.getGmailReportado()).get();
        ClienteEntity cliEmisor= clienteRepository.findById(request.getEmisor()).get();
        ReporteEntity nuevoReporte = new ReporteEntity(new ReporteEntityPK(request.getGmailReportado(),request.getEmisor()), request.getFechaReporte(),request.getMotivo(), cliRepor, cliEmisor);
        guardarReporte(nuevoReporte);
        ReporteDTO reporte= new ReporteDTO(nuevoReporte);
        return new ResponseEntity<>(reporte, HttpStatus.CREATED);
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
    @Transactional
    public void eliminarReporte(String gmailReportado) {
        ReporteEntity repor= reporteRepository.findByReporteEntityPK_GmailReportado(gmailReportado);
        if(repor!=null){
            reporteRepository.deleteByReporteEntityPK_GmailReportado(gmailReportado);
        }        
    }


}

package com.rusticasaback.rusticasaback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rusticasaback.rusticasaback.DTOs.ReporteDTO;
import com.rusticasaback.rusticasaback.Request.ReporteRequest;
import com.rusticasaback.rusticasaback.entities.ReporteEntity;
import com.rusticasaback.rusticasaback.services.ReporteService;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/reporte")
public class ReporteController {
    @Autowired
    private ReporteService reporteService;

    // Endpoint para crear un nuevo reporte
    @PostMapping("/crearReport")
    public ResponseEntity<?> crearReporte(@RequestBody ReporteRequest report) {
       return reporteService.crearReporte(report);
    }

    // Endpoint para contar reportes por Gmail
    @GetMapping("/count/{gmail}")
    public ResponseEntity<?> contarReportesPorGmail(@PathVariable String gmail) {
        int conteo = reporteService.contarReportesPorGmail(gmail);
        return new ResponseEntity<>(conteo, HttpStatus.OK);
    }

    // Endpoint para obtener todos los reportes hacia un usuario específico
    @GetMapping("/cliente/{gmail}")
    public ResponseEntity<?> obtenerReportesPorCliente(@PathVariable String gmail) {
        List<ReporteEntity> reportes = reporteService.obtenerReportesPorCliente(gmail);
        List<ReporteDTO> listaRepor = ReporteDTO.convertFromEntityList(reportes);
        return new ResponseEntity<>(listaRepor, HttpStatus.OK);
    }

    // Endpoint para eliminar un reporte
    @DeleteMapping("/eliminarReporte/{gmailReportado}")
    public ResponseEntity<?> eliminarReporte(@PathVariable String gmailReportado) {                
        reporteService.eliminarReporte(gmailReportado);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

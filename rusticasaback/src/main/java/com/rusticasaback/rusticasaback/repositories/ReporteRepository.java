package com.rusticasaback.rusticasaback.repositories;

import com.rusticasaback.rusticasaback.entities.ReporteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReporteRepository extends JpaRepository<ReporteEntity, String> {

    // Método para encontrar todos los reportes hacia un usuario específico
    List<ReporteEntity> findByClienteReportado_Gmail(String clienteReportadoGmail);
    
    @Query("SELECT COUNT(r) FROM ReporteEntity r WHERE r.clienteReportado.gmail = :gmail")
    int countReportesByGmail(@Param("gmail") String gmail);
}


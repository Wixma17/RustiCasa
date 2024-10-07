package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rusticasaback.rusticasaback.entities.BloqueadosEntity;

public interface BloqueadosRepository extends JpaRepository<BloqueadosEntity, String> {
    
    // Método para eliminar un registro de bloqueo
    void deleteByGmailBloqueado(String gmailBloqueado);

    boolean existsByGmailBloqueado(String gmailReportado);
    
}

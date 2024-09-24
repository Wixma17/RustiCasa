package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntityPK;

public interface AlquilaRepository extends JpaRepository<AlquilaEntity, AlquilaEntityPK>{
    @Query("SELECT a.casa, a.alquilaEntityPK.fechaEntrada, a.fechaSalida " +
           "FROM AlquilaEntity a " +
           "WHERE a.alquilaEntityPK.gmail = :gmail")
    Page<Object[]> findCasasByGmail(@Param("gmail") String gmail, Pageable pageable);
}

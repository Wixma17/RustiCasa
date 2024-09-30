package com.rusticasaback.rusticasaback.repositories;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntityPK;

import jakarta.transaction.Transactional;


public interface OpinaRepository extends JpaRepository<OpinaEntity, OpinaEntityPK>{
    List<OpinaEntity> findByOpinaEntityPK_IdCasa(Long idCasa);

    Page<OpinaEntity> findByOpinaEntityPK_IdCasa(Long idCasa, Pageable pageable);

    @Transactional
    @Modifying
    @Query("DELETE FROM OpinaEntity o WHERE o.casaOpinion.idCasa = :idCasa")
    void deleteByCasaId(Long idCasa);
}

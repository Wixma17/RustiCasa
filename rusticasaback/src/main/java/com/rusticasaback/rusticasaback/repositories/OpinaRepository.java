package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntityPK;


public interface OpinaRepository extends JpaRepository<OpinaEntity, OpinaEntityPK>{
    @Query("Select o From OpinaEntityPK o where o.idCasa like :idCasa")
    OpinaEntity findByIdCasa(Long idCasa);
}

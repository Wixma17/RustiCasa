package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntityPK;

@Repository
public interface OpinaRepository extends JpaRepository<OpinaEntity, OpinaEntityPK>{
    
}

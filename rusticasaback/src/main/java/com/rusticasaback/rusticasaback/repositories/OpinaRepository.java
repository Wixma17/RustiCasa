package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntityPK;


public interface OpinaRepository extends JpaRepository<OpinaEntity, OpinaEntityPK>{
   
}

package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rusticasaback.rusticasaback.entities.MunicipioEntity;

@Repository
public interface MunicipioRepository extends JpaRepository<MunicipioEntity, Integer>{
    
}

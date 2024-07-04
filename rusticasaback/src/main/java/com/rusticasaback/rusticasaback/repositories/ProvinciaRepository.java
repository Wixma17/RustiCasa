package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rusticasaback.rusticasaback.entities.ProvinciaEntity;

@Repository
public interface ProvinciaRepository extends JpaRepository<ProvinciaEntity, Integer>{
    
}

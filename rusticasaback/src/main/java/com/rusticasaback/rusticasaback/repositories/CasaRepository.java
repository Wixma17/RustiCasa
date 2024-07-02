package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rusticasaback.rusticasaback.entities.CasaEntity;

@Repository
public interface CasaRepository extends JpaRepository<CasaEntity,Integer>{

    
} 

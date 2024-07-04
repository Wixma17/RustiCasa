package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rusticasaback.rusticasaback.entities.MensajeEntity;

@Repository
public interface MensajeRepository extends JpaRepository<MensajeEntity, Long>{
    
}

package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rusticasaback.rusticasaback.entities.MensajeEntity;


public interface MensajeRepository extends JpaRepository<MensajeEntity,Integer>{
    
}

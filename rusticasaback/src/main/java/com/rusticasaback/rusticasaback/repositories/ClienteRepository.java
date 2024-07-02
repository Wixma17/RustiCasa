package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rusticasaback.rusticasaback.entities.ClienteEntity;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteEntity,String>{
    
}

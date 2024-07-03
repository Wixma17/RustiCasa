package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;

import java.util.List;


@Repository
public interface CasaRepository extends JpaRepository<CasaEntity,Integer>{

    List<CasaEntity> findByCliente(ClienteEntity cliente);

} 

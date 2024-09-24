package com.rusticasaback.rusticasaback.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntityPK;

public interface AlquilaRepository extends JpaRepository<AlquilaEntity, AlquilaEntityPK>{
    List<AlquilaEntity> findByClienteGmail(String gmail);
}

package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ImagenEntity;
import java.util.List;

@Repository
public interface ImagenRepository extends JpaRepository<ImagenEntity, Long> {
    List<ImagenEntity> findByCasaImagen(CasaEntity casaImagen);
}

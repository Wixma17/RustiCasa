package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ImagenEntity;

import jakarta.transaction.Transactional;

import java.util.List;

@Repository
public interface ImagenRepository extends JpaRepository<ImagenEntity, Long> {
    List<ImagenEntity> findByCasaImagen(CasaEntity casaImagen);   
    
    @Transactional
    @Modifying
    @Query("DELETE FROM ImagenEntity i WHERE i.casaImagen.idCasa = :idCasa")
    void deleteByCasaId(Long idCasa);
}

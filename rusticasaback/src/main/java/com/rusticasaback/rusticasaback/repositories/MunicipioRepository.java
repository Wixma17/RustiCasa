package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.rusticasaback.rusticasaback.entities.MunicipioEntity;
import java.util.List;


@Repository
public interface MunicipioRepository extends JpaRepository<MunicipioEntity, Integer>{
    List<MunicipioEntity> findByProvinciaIdProvincia(int idProvincia);
    
    @Query("SELECT m.provincia.idProvincia FROM MunicipioEntity m WHERE m.idMunicipio = :idMunicipio")
    Long findIdProvinciaByIdMunicipio(@Param("idMunicipio") Long idMunicipio);
}

package com.rusticasaback.rusticasaback.repositories;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface CasaRepository extends JpaRepository<CasaEntity, Long> {
    List<CasaEntity> findByClientePublicador(ClienteEntity clientePublicador);

    @Query("Select c From CasaEntity c where c.mascotas=:mascotas and c.piscina=:piscina and c.wifi=:wifi and c.jardin=:jardin")
    List<CasaEntity> findFiltrados(boolean mascotas, boolean wifi, boolean jardin, boolean piscina);

    List<CasaEntity> findByNombreCasa(String nombreCasa);

    List<CasaEntity> findByMunicipio_Provincia_IdProvincia(int idProvincia);

    @Query("SELECT c FROM CasaEntity c WHERE c.idCasa NOT IN " +
            "(SELECT a.casa.idCasa FROM AlquilaEntity a WHERE " +
            "(:fechaEntrada <= a.fechaSalida AND :fechaSalida >= a.alquilaEntityPK.fechaEntrada))")
    List<CasaEntity> findCasasDisponiblesByFechas(@Param("fechaEntrada") Date fechaEntrada,
            @Param("fechaSalida") Date fechaSalida);

}

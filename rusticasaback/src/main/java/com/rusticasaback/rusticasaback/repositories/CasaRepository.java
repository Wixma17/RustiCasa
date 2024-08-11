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

        @Query("SELECT c FROM CasaEntity c WHERE c.idCasa NOT IN (" +
                        "SELECT a.casa.idCasa FROM AlquilaEntity a WHERE " +
                        "(:checkIn <= a.fechaSalida AND :checkOut >= a.alquilaEntityPK.fechaEntrada)) "
                        +
                        "AND (:codProv IS NULL OR c.municipio.provincia.idProvincia = :codProv) " +
                        "AND (:codMun IS NULL OR c.municipio.idMunicipio = :codMun) " +
                        "AND (:numInqui IS NULL OR c.numeroInquilinos >= :numInqui) " +
                        "AND (:numHab IS NULL OR c.numeroHabitaciones >= :numHab)")
        List<CasaEntity> findAvailableHouses(
                        @Param("checkIn") Date checkIn,
                        @Param("checkOut") Date checkOut,
                        @Param("codProv") Integer codProv,
                        @Param("codMun") Integer codMun,
                        @Param("numInqui") Integer numInqui,
                        @Param("numHab") Integer numHab);

        @Query("SELECT MAX(c.precioNoche) FROM CasaEntity c")
        Integer findMaxPrecioNoche();

        @Query("SELECT Min(c.precioNoche) FROM CasaEntity c")
        Integer findMinPrecioNoche();
}

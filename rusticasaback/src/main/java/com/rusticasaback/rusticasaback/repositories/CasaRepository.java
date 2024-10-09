package com.rusticasaback.rusticasaback.repositories;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Date;
import java.util.List;

public interface CasaRepository extends JpaRepository<CasaEntity, Long> {
        List<CasaEntity> findByClientePublicador(ClienteEntity clientePublicador);

        @Query("SELECT c FROM CasaEntity c WHERE c.idCasa NOT IN (" +
                        "SELECT a.casa.idCasa FROM AlquilaEntity a WHERE " +
                        "(:checkIn <= a.fechaSalida AND :checkOut >= a.alquilaEntityPK.fechaEntrada)) " +
                        "AND (:codProv IS NULL OR c.municipio.provincia.idProvincia = :codProv) " +
                        "AND (:codMun IS NULL OR c.municipio.idMunicipio = :codMun) " +
                        "AND (:numInqui IS NULL OR c.numeroInquilinos >= :numInqui) " +
                        "AND (:numHab IS NULL OR c.numeroHabitaciones >= :numHab) " +
                        "AND (:mascotas IS NULL OR c.mascotas = :mascotas) " +
                        "AND (:wifi IS NULL OR c.wifi = :wifi) " +
                        "AND (:jardin IS NULL OR c.jardin = :jardin) " +
                        "AND (:piscina IS NULL OR c.piscina = :piscina) " +
                        "AND (:precioMin IS NULL OR c.precioNoche >= :precioMin) " +
                        "AND (:precioMax IS NULL OR c.precioNoche <= :precioMax)")
        Page<CasaEntity> findAvailableHouses(
                        @Param("checkIn") Date checkIn,
                        @Param("checkOut") Date checkOut,
                        @Param("codProv") Integer codProv,
                        @Param("codMun") Integer codMun,
                        @Param("numInqui") Integer numInqui,
                        @Param("numHab") Integer numHab,
                        @Param("mascotas") Boolean mascotas,
                        @Param("wifi") Boolean wifi,
                        @Param("jardin") Boolean jardin,
                        @Param("piscina") Boolean piscina,
                        @Param("precioMin") Integer precioMin,
                        @Param("precioMax") Integer precioMax,
                        Pageable pageable);

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
        Page<CasaEntity> findAvailableHouses(
                        @Param("checkIn") Date checkIn,
                        @Param("checkOut") Date checkOut,
                        @Param("codProv") Integer codProv,
                        @Param("codMun") Integer codMun,
                        @Param("numInqui") Integer numInqui,
                        @Param("numHab") Integer numHab, Pageable pageable);

        @Query("SELECT MAX(c.precioNoche) FROM CasaEntity c")
        Integer findMaxPrecioNoche();

        @Query("SELECT Min(c.precioNoche) FROM CasaEntity c")
        Integer findMinPrecioNoche();

        Page<CasaEntity> findByClientePublicador(ClienteEntity cliente, Pageable pageable);

        @Query("SELECT c.clientePublicador.gmail FROM CasaEntity c WHERE c.idCasa = :idCasa")
        String findGmailPublicadorByIdCasa(Long idCasa);
}

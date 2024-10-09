package com.rusticasaback.rusticasaback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntityPK;

import jakarta.transaction.Transactional;

public interface AlquilaRepository extends JpaRepository<AlquilaEntity, AlquilaEntityPK> {
        @Query("SELECT a.casa, a.alquilaEntityPK.fechaEntrada, a.fechaSalida " +
                        "FROM AlquilaEntity a " +
                        "WHERE a.alquilaEntityPK.gmail = :gmail")
        Page<Object[]> findCasasByGmail(@Param("gmail") String gmail, Pageable pageable);

        @Query("SELECT a.casa.idCasa FROM AlquilaEntity a WHERE a.fechaSalida >= :fechaEntrada AND a.alquilaEntityPK.fechaEntrada <= :fechaSalida")
        List<Long> findCasaIdsByFechas(@Param("fechaEntrada") Date fechaEntrada,
                        @Param("fechaSalida") Date fechaSalida);

        @Transactional
        @Modifying
        @Query("DELETE FROM AlquilaEntity a WHERE a.casa.idCasa = :idCasa")
        void deleteByCasaId(Long idCasa);

        @Query("SELECT YEAR(a.alquilaEntityPK.fechaEntrada) AS anio, " +
                        "MONTH(a.alquilaEntityPK.fechaEntrada) AS mes, " +
                        "COUNT(a) AS totalAlquileres " +
                        "FROM AlquilaEntity a " +
                        "GROUP BY YEAR(a.alquilaEntityPK.fechaEntrada), MONTH(a.alquilaEntityPK.fechaEntrada) " +
                        "ORDER BY anio, mes")
        List<Object[]> findAlquilerPorMes();

        @Query("SELECT a.estado FROM AlquilaEntity a JOIN a.casa c WHERE c.clientePublicador.gmail = :gmail")
        List<String> findEstadoByGmail(@Param("gmail") String gmail);

}

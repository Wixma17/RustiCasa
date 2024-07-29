package com.rusticasaback.rusticasaback.repositories;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CasaRepository extends JpaRepository<CasaEntity, Long> {
    List<CasaEntity> findByClientePublicador(ClienteEntity clientePublicador);

    @Query("Select c From CasaEntity c where c.mascotas=:mascotas and c.piscina=:piscina and c.wifi=:wifi and c.jardin=:jardin")
    List<CasaEntity> findFiltrados(boolean mascotas, boolean wifi, boolean jardin, boolean piscina);

    @Query("Select c From CasaEntity c where c.nombreCasa like %:nombreCasa%")
    List<CasaEntity> findLikeNombreCasa(String nombreCasa);
}

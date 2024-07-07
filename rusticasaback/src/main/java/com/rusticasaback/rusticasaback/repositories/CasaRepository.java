package com.rusticasaback.rusticasaback.repositories;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CasaRepository extends JpaRepository<CasaEntity, Long> {
    List<CasaEntity> findByClientePublicador(ClienteEntity clientePublicador);
    List<CasaEntity> findByMascotas(boolean mascotas);
}



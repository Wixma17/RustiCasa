package com.rusticasaback.rusticasaback.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.rusticasaback.rusticasaback.Request.AlquilaRequest;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntity;
import com.rusticasaback.rusticasaback.repositories.AlquilaRepository;
import com.rusticasaback.rusticasaback.repositories.CasaRepository;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;

@Service
public class AlquilaService {

    @Autowired
    AlquilaRepository alquilaRepository;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    CasaRepository casaRepository;

    public AlquilaEntity guardaReserva(AlquilaEntity alquilaEntity) {
        return alquilaRepository.save(alquilaEntity);
    }

    public AlquilaEntity creaReserva(AlquilaRequest alquilaRequest) {
        ClienteEntity cliente = clienteRepository
                .findById(alquilaRequest.getAlquilaDTO().getAlquilaEntityPK().getGmail()).get();

        CasaEntity casa = casaRepository.findById(alquilaRequest.getAlquilaDTO().getAlquilaEntityPK().getIdCasa())
                .get();

        AlquilaEntity alquilaCasa = new AlquilaEntity(alquilaRequest.getAlquilaDTO().getAlquilaEntityPK(),
                alquilaRequest.getAlquilaDTO().getFechaSalida(), cliente, casa);

        return guardaReserva(alquilaCasa);
    }
}

package com.rusticasaback.rusticasaback.services;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.rusticasaback.rusticasaback.DTOs.AlquilaDTO;
import com.rusticasaback.rusticasaback.Request.AlquilaRequest;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntityPK;
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
                .findById(alquilaRequest.getGmail()).get();

        CasaEntity casa = casaRepository.findById(alquilaRequest.getIdCasa())
                .get();

        AlquilaEntity alquilaCasa = new AlquilaEntity(new AlquilaEntityPK(alquilaRequest.getGmail(),alquilaRequest.getIdCasa(),alquilaRequest.getFechaEntrada()),
                alquilaRequest.getFechaSalida(), cliente, casa);

        return guardaReserva(alquilaCasa);
    }

    public ArrayList<AlquilaDTO> getAlquileresPorGmail(String gmail) {

        ArrayList<AlquilaDTO>listaAlquila = new ArrayList<>();

        List<AlquilaEntity>listAlquila=alquilaRepository.findByClienteGmail(gmail);

        for (AlquilaEntity al : listAlquila) {
            listaAlquila.add(new AlquilaDTO(al));
        }

        return listaAlquila;
    }
}

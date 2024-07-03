package com.rusticasaback.rusticasaback.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.repositories.CasaRepository;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;
import com.rusticasaback.rusticasaback.responses.CasaResponse;

@Service
public class CasaService {

    @Autowired
    private CasaRepository casaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    public ResponseEntity<?> getListaCasa(String gmail) {
        ClienteEntity cliente = clienteRepository.findById(gmail).get();
        List<CasaEntity> listaCasa = casaRepository.findByCliente(cliente);
        ArrayList<CasaResponse> listaCasaResp = new ArrayList<CasaResponse>();
        for (CasaEntity casa : listaCasa) {
            listaCasaResp.add(new CasaResponse(casa.getId_casa(), casa.getDescripcion(), casa.getNombre_casa(),casa.isMascotas()));
        }

        return ResponseEntity.ok(listaCasaResp);
    }

    public CasaEntity guardaCasa(CasaEntity casa) {
        return casaRepository.save(casa);
    }

}

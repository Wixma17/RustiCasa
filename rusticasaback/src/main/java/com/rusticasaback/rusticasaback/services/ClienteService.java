package com.rusticasaback.rusticasaback.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;
import com.rusticasaback.rusticasaback.response.ClienteResponse;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public ResponseEntity<?> getListaCliente() {
        List<ClienteEntity> listaCliente = clienteRepository.findAll();
        ArrayList<ClienteResponse> listaRespuesta = new ArrayList<ClienteResponse>();
        for (ClienteEntity cliente : listaCliente) {
            listaRespuesta.add(new ClienteResponse(cliente.getNickname(), cliente.getGmail()));
        }

        return ResponseEntity.ok(listaRespuesta);
    }

}

package com.rusticasaback.rusticasaback.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rusticasaback.rusticasaback.DTOs.ClienteDTO;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public ClienteDTO authenticate(String gmail, String passwd) {
        ClienteEntity cliente = clienteRepository.findById(gmail).orElse(null);

        if (cliente != null && cliente.getPasswd().equals(passwd)) {
            ClienteDTO clienteDTO = new ClienteDTO(cliente);
            return clienteDTO;
        } else {
            return null;
        }
    }

    public ClienteEntity guardaCliente(ClienteEntity cli) {
        return clienteRepository.save(cli);
    }

    public ResponseEntity<?> recuperarDatos(String gmail) {
        ClienteDTO cli = new ClienteDTO(clienteRepository.findById(gmail).orElse(null));

        return new ResponseEntity<>(cli, HttpStatus.CREATED);
    }

}

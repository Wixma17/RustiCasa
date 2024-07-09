package com.rusticasaback.rusticasaback.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rusticasaback.rusticasaback.DTOs.ClienteDTO;
import com.rusticasaback.rusticasaback.Response.ClienteResponse;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public ClienteResponse authenticate(String gmail, String passwd) {
        ClienteEntity cliente = clienteRepository.findById(gmail).orElse(null);

        ClienteDTO clienteDTO = new ClienteDTO(cliente);

        if (cliente != null && cliente.getPasswd().equals(passwd)) {
            ClienteResponse clienteRespose = new ClienteResponse(clienteDTO);
            return clienteRespose;
        } else {
            return null;
        }
    }

    public ClienteEntity guardaCliente(ClienteEntity cli) {
        return clienteRepository.save(cli);
    }

}

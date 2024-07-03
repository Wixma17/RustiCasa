package com.rusticasaback.rusticasaback.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;
import com.rusticasaback.rusticasaback.responses.ClienteResponse;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public ResponseEntity<?> getListaCliente() {
        List<ClienteEntity> listaCliente = clienteRepository.findAll();
        ArrayList<ClienteResponse> listaRespuesta = new ArrayList<ClienteResponse>();
        for (ClienteEntity cliente : listaCliente) {
            listaRespuesta.add(new ClienteResponse(cliente.getNickname(), cliente.getGmail(), cliente.getPasswd(),
                    cliente.getNombre(), cliente.getApellido(),cliente.isAdministrador()));
        }

        return ResponseEntity.ok(listaRespuesta);
    }

    public ClienteResponse authenticate(String gmail, String passwd) {
        ClienteEntity cliente = clienteRepository.findById(gmail).orElse(null);

        if (cliente != null && cliente.getPasswd().equals(passwd)) {
            ClienteResponse clienteRespose = new ClienteResponse(cliente.getNickname(), cliente.getGmail(),
                    cliente.getPasswd(), cliente.getNombre(), cliente.getApellido(),cliente.isAdministrador());
            return clienteRespose;
        } else {
            return null;
        }
    }

    public ClienteEntity guardaCliente(ClienteEntity cli) {
        return clienteRepository.save(cli);
    }

}

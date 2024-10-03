package com.rusticasaback.rusticasaback.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.rusticasaback.rusticasaback.DTOs.ClienteDTO;
import com.rusticasaback.rusticasaback.Request.RegisterRequest;
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

    public ClienteDTO crearCliente(RegisterRequest register){
        ClienteEntity cli= new ClienteDTO(register.getGmail(), register.getNombre(), register.getApellido(), register.getPasswd(), register.getNickname(), register.isAdministrador(), register.getFechaNacimiento(), null).createClienteEntity();           
        guardaCliente(cli);
        ClienteDTO clienteAux=new ClienteDTO(cli);
        return clienteAux;
    }

    public ClienteEntity guardaCliente(ClienteEntity cli) {
        return clienteRepository.save(cli);
    }

    public Optional<ClienteEntity> verClienteExistente(String email) {
        Optional<ClienteEntity> cli=clienteRepository.findById(email);
        return cli;      
    }

    public ResponseEntity<?> recuperarDatos(String gmail) {
        ClienteDTO cli = new ClienteDTO(clienteRepository.findById(gmail).orElse(null));

        return new ResponseEntity<>(cli, HttpStatus.CREATED);
    }


    public ClienteDTO recuperarDatosBack(String gmail) {
        ClienteDTO cli = new ClienteDTO(clienteRepository.findById(gmail).orElse(null));
        return cli;
    }

    public ArrayList<ClienteDTO> getListaUsuarios() {
        List<ClienteEntity> listaUsuario = clienteRepository.findAll();
        ArrayList<ClienteDTO> listaUsuResp = new ArrayList<ClienteDTO>();
        for (ClienteEntity usu : listaUsuario) {
            listaUsuResp.add(new ClienteDTO(usu));
        }
        
        return listaUsuResp;
    }

}

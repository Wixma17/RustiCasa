package com.rusticasaback.rusticasaback.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rusticasaback.rusticasaback.Request.LoginRequest;
import com.rusticasaback.rusticasaback.Request.RegisterRequest;
import com.rusticasaback.rusticasaback.Response.ClienteResponse;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.services.ClienteService;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private ClienteService clienteService;

    @PostMapping("/login")
    public ResponseEntity<ClienteResponse> login(@RequestBody LoginRequest loginRequest) {
        ClienteResponse cli = clienteService.authenticate(loginRequest.getGmail(), loginRequest.getPasswd());

        if (cli != null) {
            return ResponseEntity.ok(cli);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {

        ClienteEntity nuevoCliente = new ClienteEntity(registerRequest.getClienteDTO().getGmail(),
                registerRequest.getClienteDTO().getNombre(),
                registerRequest.getClienteDTO().getApellido(), registerRequest.getClienteDTO().getPasswd(),
                registerRequest.getClienteDTO().getNickname(),
                registerRequest.getClienteDTO().isAdministrador(), registerRequest.getClienteDTO().getFechaNacimiento(),registerRequest.getClienteDTO().getImagen(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

        return new ResponseEntity<>(clienteService.guardaCliente(nuevoCliente), HttpStatus.CREATED);
    }

}

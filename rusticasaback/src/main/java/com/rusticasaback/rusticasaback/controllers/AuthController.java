package com.rusticasaback.rusticasaback.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rusticasaback.rusticasaback.DTOs.ClienteDTO;
import com.rusticasaback.rusticasaback.Request.LoginRequest;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.services.ClienteService;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private ClienteService clienteService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        ClienteDTO cli = clienteService.authenticate(loginRequest.getGmail(), loginRequest.getPasswd());

        return new ResponseEntity<>(cli, HttpStatus.CREATED);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody ClienteDTO registerRequest) {

        ClienteEntity nuevoCliente = new ClienteEntity(registerRequest.getGmail(),
                registerRequest.getNombre(),
                registerRequest.getApellido(), registerRequest.getPasswd(),
                registerRequest.getNickname(),
                registerRequest.isAdministrador(), registerRequest.getFechaNacimiento(),registerRequest.getImagen(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

        return new ResponseEntity<>(clienteService.guardaCliente(nuevoCliente), HttpStatus.CREATED);
    }

}

package com.rusticasaback.rusticasaback.controllers;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.requests.LoginRequest;
import com.rusticasaback.rusticasaback.requests.RegisterRequest;
import com.rusticasaback.rusticasaback.responses.ClienteResponse;
import com.rusticasaback.rusticasaback.services.ClienteService;

import java.util.HashSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
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
        
        ClienteEntity nuevoCliente= new ClienteEntity(registerRequest.getGmail(), registerRequest.getNombre_usuario(), registerRequest.getApellido_usuario(),registerRequest.getPasswd(), registerRequest.getNickname(), registerRequest.isAdministrador(),registerRequest.getFecha_nacimiento(), new HashSet<CasaEntity>());

        return new ResponseEntity<>(clienteService.guardaCliente(nuevoCliente), HttpStatus.CREATED);
    }
}
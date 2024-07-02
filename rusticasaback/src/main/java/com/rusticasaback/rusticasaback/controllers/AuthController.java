package com.rusticasaback.rusticasaback.controllers;

import com.rusticasaback.rusticasaback.request.LoginRequest;
import com.rusticasaback.rusticasaback.response.ClienteResponse;
import com.rusticasaback.rusticasaback.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
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
            return ResponseEntity.badRequest().build();
        }
    }
}
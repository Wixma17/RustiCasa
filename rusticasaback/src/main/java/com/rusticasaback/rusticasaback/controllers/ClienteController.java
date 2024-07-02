package com.rusticasaback.rusticasaback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.rusticasaback.rusticasaback.services.ClienteService;

@RestController
@RequestMapping("/api/client")
@CrossOrigin
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/list")
    public ResponseEntity<?> listaCliente() {
        return clienteService.getListaCliente();
    }

}

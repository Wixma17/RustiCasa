package com.rusticasaback.rusticasaback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rusticasaback.rusticasaback.Request.MensajeRequest;
import com.rusticasaback.rusticasaback.services.MensajeService;

@RestController
@CrossOrigin
@RequestMapping("/api/mensajes")
public class MensajesController {

    @Autowired
    private MensajeService mensajeService;

    @PostMapping("/subeMensajes")
    public ResponseEntity<?> listaCasa(@RequestBody MensajeRequest mensajeRequest) {
        
        mensajeService.crearMensaje(mensajeRequest);

        return ResponseEntity.ok().build();
    }

}

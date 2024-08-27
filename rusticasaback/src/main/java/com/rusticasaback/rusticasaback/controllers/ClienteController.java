package com.rusticasaback.rusticasaback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rusticasaback.rusticasaback.services.ImagenService;

@RestController
@CrossOrigin
@RequestMapping("/api/cliente")
public class ClienteController {

    @Autowired
    private ImagenService imagenService;

    @GetMapping("/fotoPerfil/{gmail}")
    public ResponseEntity<?> fotosCasa(@PathVariable(name = "gmail") String gmail) {
        return imagenService.getImagenPerfil(gmail);
    }
}

package com.rusticasaback.rusticasaback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rusticasaback.rusticasaback.services.ProvinciaService;

@RestController
@CrossOrigin
@RequestMapping("/api/ProvMuni")
public class ProvinciaMunicipioController {

    @Autowired
    private ProvinciaService provinciaService;

    @GetMapping("/listaProvincias")
    public ResponseEntity<?> listaProvincia() {
        return provinciaService.getListaProvincias();
    }
    
}

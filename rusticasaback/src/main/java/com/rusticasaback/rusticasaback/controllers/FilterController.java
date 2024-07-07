package com.rusticasaback.rusticasaback.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.services.CasaService;

@RestController
@RequestMapping("/api/filtro")
@CrossOrigin
public class FilterController {

    @Autowired
    private CasaService casaService;

   
    @GetMapping("/casas")
    public List<CasaEntity> getCasasByMascotas(@RequestParam boolean mascotas) {
        return casaService.getCasasByMascotas(mascotas);
    }
    
}

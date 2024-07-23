package com.rusticasaback.rusticasaback.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.rusticasaback.rusticasaback.DTOs.CasaDTO;
import com.rusticasaback.rusticasaback.services.CasaService;

@RestController
@CrossOrigin
@RequestMapping("/api/filtro")
public class FilterController {

    @Autowired
    private CasaService casaService;

    @GetMapping("/casas")
    public List<CasaDTO> getCasasFiltradas(@RequestParam boolean mascotas, @RequestParam boolean wifi,
            @RequestParam boolean jardin, @RequestParam boolean piscina, @RequestParam int precioMin,
            @RequestParam int precioMax, @RequestParam int inquilinos, @RequestParam int numHab) {
        List<CasaDTO> listaDTO = CasaDTO.convertFromEntityList(casaService.getCasasFiltradas(mascotas, wifi, jardin,
                piscina, precioMin, precioMax, inquilinos, numHab));
        return listaDTO;
    }

}

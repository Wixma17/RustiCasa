package com.rusticasaback.rusticasaback.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rusticasaback.rusticasaback.DTOs.CasaDTO;
import com.rusticasaback.rusticasaback.Request.CasaSimpleRequest;
import com.rusticasaback.rusticasaback.services.BusquedasService;
import com.rusticasaback.rusticasaback.services.CasaService;

@RestController
@CrossOrigin
@RequestMapping("/api/filtro")
public class FilterController {

    @Autowired
    private CasaService casaService;

    @Autowired
    private BusquedasService busquedasService;

    @GetMapping("/casas")
    public List<CasaDTO> getCasasFiltradas(@RequestParam boolean mascotas, @RequestParam boolean wifi,
            @RequestParam boolean jardin, @RequestParam boolean piscina, @RequestParam int precioMin,
            @RequestParam int precioMax, @RequestParam int inquilinos, @RequestParam int numHab) {
        List<CasaDTO> listaDTO = CasaDTO.convertFromEntityList(casaService.getCasasFiltradas(mascotas, wifi, jardin,
                piscina, precioMin, precioMax, inquilinos, numHab));
        return listaDTO;
    }

    @PostMapping("/busquedaSimple")    
    public ResponseEntity<?> getCasasBusquedaSimple(@RequestBody CasaSimpleRequest request) {
        return busquedasService.getCasasByFecha(request.getCheckIn(), request.getCheckOut());        
    }

}

package com.rusticasaback.rusticasaback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rusticasaback.rusticasaback.services.MunicipioService;
import com.rusticasaback.rusticasaback.services.ProvinciaService;

@RestController
@CrossOrigin
@RequestMapping("/api/ProvMuni")
public class ProvinciaMunicipioController {

    @Autowired
    private ProvinciaService provinciaService;

    @Autowired
    private MunicipioService municipioService;

    @GetMapping("/listaProvincias")
    public ResponseEntity<?> listaProvincia() {
        return provinciaService.getListaProvincias();
    }

    @GetMapping("/listaMunicipio/{idProv}")
    public ResponseEntity<?> listaMunicipio(@PathVariable(name = "idProv") int idProv) {
        return municipioService.getListaMunicipio(idProv);
    }

    @GetMapping("/prov/{idProv}")
    public ResponseEntity<?> getNombreProv(@PathVariable(name = "idProv") int idProv) {
        return provinciaService.getNombreProv(idProv);
    }

    @GetMapping("/mun/{idMun}")
    public ResponseEntity<?> getNombreMun(@PathVariable(name = "idMun") int idMun) {
        return municipioService.getNombreMun(idMun);
    }
    
}

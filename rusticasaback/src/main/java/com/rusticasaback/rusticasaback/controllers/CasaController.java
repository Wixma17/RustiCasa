package com.rusticasaback.rusticasaback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.requests.CasaRequest;
import com.rusticasaback.rusticasaback.services.CasaService;

@RestController
@RequestMapping("/api/casa")
@CrossOrigin
public class CasaController {

    @Autowired
    private CasaService casaService;

    @GetMapping("/listaCasa/{email}")
    public ResponseEntity<?> listaCasa(@PathVariable(name = "email") String email) {
        return casaService.getListaCasa(email);
    }

    @PostMapping("/registrarCasa")
    public ResponseEntity<?> registrarCasa(@RequestBody CasaRequest casaRequest) {

        /* Comprobar que funciona */

        CasaEntity nuevaCasa = new CasaEntity(casaRequest.getId_casa(), casaRequest.getDescripcion(),
                casaRequest.getNombre_casa(), casaRequest.isMascotas(), casaRequest.getCliente());

        return new ResponseEntity<>(casaService.guardaCasa(nuevaCasa), HttpStatus.CREATED);
    }

}

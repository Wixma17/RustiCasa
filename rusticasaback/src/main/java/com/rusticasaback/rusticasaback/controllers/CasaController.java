package com.rusticasaback.rusticasaback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rusticasaback.rusticasaback.DTOs.CasaDTO;
import com.rusticasaback.rusticasaback.DTOs.MunicipioDTO;
import com.rusticasaback.rusticasaback.Request.CasaRequest;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
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

        /* La lista imagenes es ImagenesDTO y la entity de casa guarda una entity imagen */

        /* Ver los cambios en response , request , imagenService y casaService*/

        CasaEntity nuevaCasa = new CasaEntity(casaRequest.getCasaDto().getIdCasa(), casaRequest.getCasaDto().getDescripcion(),
                casaRequest.getCasaDto().getNombreCasa(), casaRequest.getCasaDto().isMascotas(),  casaRequest.getMunicipio().createMunicipioEntity(),
                casaRequest.getCasaDto().getPrecioNoche(), casaRequest.getCasaDto().getNumeroHabitaciones(), casaRequest.getCasaDto().getNumeroInquilinos(),
                casaRequest.getCasaDto().isPiscina(), casaRequest.getCasaDto().isWifi(), casaRequest.getCasaDto().isJardin(), casaRequest.getListaImagenes(),
                casaRequest.getClientePublicador(), casaRequest.getListaAlquilado(), casaRequest.getListaCasaOpinion());

        /* Ver Con rafa */
        CasaEntity casaGuardada=casaService.guardaCasa(nuevaCasa);
        CasaRequest casaResultado=new CasaRequest(new CasaDTO(casaGuardada),new MunicipioDTO(casaGuardada.getMunicipio()),null,null,null,null);
        return new ResponseEntity<>(casaResultado, HttpStatus.CREATED);
    }

}

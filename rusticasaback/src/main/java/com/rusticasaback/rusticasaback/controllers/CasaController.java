package com.rusticasaback.rusticasaback.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rusticasaback.rusticasaback.DTOs.CasaDTO;
import com.rusticasaback.rusticasaback.DTOs.ClienteDTO;
import com.rusticasaback.rusticasaback.DTOs.ImagenDTO;
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

        CasaEntity nuevaCasa = new CasaEntity(casaRequest.getCasaDto().getIdCasa(),
                casaRequest.getCasaDto().getDescripcion(),
                casaRequest.getCasaDto().getNombreCasa(), casaRequest.getCasaDto().isMascotas(),
                casaRequest.getMunicipio().createMunicipioEntity(),
                casaRequest.getCasaDto().getPrecioNoche(), casaRequest.getCasaDto().getNumeroHabitaciones(),
                casaRequest.getCasaDto().getNumeroInquilinos(),
                casaRequest.getCasaDto().isPiscina(), casaRequest.getCasaDto().isWifi(),
                casaRequest.getCasaDto().isJardin(), ImagenDTO.convertFromDtoList(casaRequest.getListaImagenes()),
                ClienteDTO.createClienteEntity(casaRequest.getClientePublicador()), new ArrayList<>(),new ArrayList<>());

        CasaEntity casaGuardada = casaService.guardaCasa(nuevaCasa);
        CasaRequest casaResultado = new CasaRequest(new CasaDTO(casaGuardada),
                new MunicipioDTO(casaGuardada.getMunicipio()), ImagenDTO.convertFromEntityList(casaGuardada.getListaImagenes()), new ClienteDTO(casaGuardada.getClientePublicador()));
        return new ResponseEntity<>(casaResultado, HttpStatus.CREATED);
    }

}

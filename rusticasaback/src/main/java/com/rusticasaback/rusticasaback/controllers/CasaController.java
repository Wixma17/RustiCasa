package com.rusticasaback.rusticasaback.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.rusticasaback.rusticasaback.Request.CasaRequest;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.services.CasaService;
import com.rusticasaback.rusticasaback.services.ImagenService;

@RestController
@RequestMapping("/api/casa")
@CrossOrigin
public class CasaController {

    @Autowired
    private CasaService casaService;

    @Autowired
    private ImagenService imagenService;

    @GetMapping("/listaCasa/{email}")
    public ResponseEntity<?> listaCasa(@PathVariable(name = "email") String email) {
        return casaService.getListaCasa(email);
    }

    /*
     * @PostMapping("/registrarCasa")
     * public ResponseEntity<?> registrarCasa(@RequestBody CasaRequest casaRequest)
     * {
     * 
     * CasaEntity nuevaCasa = new CasaEntity(casaRequest.getCasaDto().getIdCasa(),
     * casaRequest.getCasaDto().getDescripcion(),
     * casaRequest.getCasaDto().getNombreCasa(),
     * casaRequest.getCasaDto().isMascotas(),
     * casaRequest.getMunicipio().createMunicipioEntity(),
     * casaRequest.getCasaDto().getPrecioNoche(),
     * casaRequest.getCasaDto().getNumeroHabitaciones(),
     * casaRequest.getCasaDto().getNumeroInquilinos(),
     * casaRequest.getCasaDto().isPiscina(), casaRequest.getCasaDto().isWifi(),
     * casaRequest.getCasaDto().isJardin(),
     * ImagenDTO.convertFromDtoList(casaRequest.getListaImagenes()),
     * ClienteDTO.createClienteEntity(casaRequest.getClientePublicador()), new
     * ArrayList<>(),
     * new ArrayList<>());
     * 
     * CasaEntity casaGuardada = casaService.guardaCasa(nuevaCasa);
     * CasaRequest casaResultado = new CasaRequest(new CasaDTO(casaGuardada),
     * new MunicipioDTO(casaGuardada.getMunicipio()),
     * ImagenDTO.convertFromEntityList(casaGuardada.getListaImagenes()),
     * new ClienteDTO(casaGuardada.getClientePublicador()));
     * return new ResponseEntity<>(casaResultado, HttpStatus.CREATED);
     * }
     */

    @PostMapping("/registrarCasa")
    public ResponseEntity<?> registrarCasa(@RequestBody CasaRequest casaRequest) {

        CasaEntity casaEntity = casaService.crearCasa(casaRequest);

        return casaService.getCasa(casaEntity.getIdCasa());

    }

    @PostMapping("/subirImagenes")
    public ResponseEntity<?> subirImagenes(@RequestParam("files") List<MultipartFile> files,
            @RequestParam("idCasa") Long idCasa) {

        imagenService.subidaImagenes(files, idCasa);

        return casaService.getCasa(idCasa);// Cambiar la respuesta

    }

}

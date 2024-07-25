package com.rusticasaback.rusticasaback.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.rusticasaback.rusticasaback.Request.AlquilaRequest;
import com.rusticasaback.rusticasaback.Request.CasaRequest;
import com.rusticasaback.rusticasaback.Request.OpinaRequest;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.services.AlquilaService;
import com.rusticasaback.rusticasaback.services.CasaService;
import com.rusticasaback.rusticasaback.services.ImagenService;
import com.rusticasaback.rusticasaback.services.OpinaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@CrossOrigin
@RequestMapping("/api/casa")
public class CasaController {

    @Autowired
    private CasaService casaService;

    @Autowired
    private ImagenService imagenService;

    @Autowired
    private OpinaService opinaService;

    @Autowired
    private AlquilaService alquilaService;

    @GetMapping("/listaCasas")
    public ResponseEntity<?> listaCasas() {
        return casaService.getListaCasas();
    }

    @GetMapping("/listaCasasUsuario/{email}")
    public ResponseEntity<?> listaCasasUsuario(@PathVariable(name = "email") String email) {
        return casaService.getListaCasasUsuario(email);
    }

    // @GetMapping("/fotosCasa/{idCasa}")
    // public ResponseEntity<?> fotosCasa(@PathVariable(name = "idCasa") Long idCasa) {
    //     return new String();
    // }
    

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

    @PostMapping("/subirOpinion")
    public ResponseEntity<?> subirOpinion(@RequestBody OpinaRequest opinaRequest) {

        opinaService.creaOpinion(opinaRequest);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/reservarCasa")
    public ResponseEntity<?> reservarCasa(@RequestBody AlquilaRequest alquilaRequest) {

        alquilaService.creaReserva(alquilaRequest);

        return ResponseEntity.ok().build();
    }

}

package com.rusticasaback.rusticasaback.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.rusticasaback.rusticasaback.Request.AlquilaRequest;
import com.rusticasaback.rusticasaback.Request.CasaRequest;
import com.rusticasaback.rusticasaback.Request.OpinaRequest;
import com.rusticasaback.rusticasaback.services.AlquilaService;
import com.rusticasaback.rusticasaback.services.CasaService;
import com.rusticasaback.rusticasaback.services.ImagenService;
import com.rusticasaback.rusticasaback.services.OpinaService;

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

    @GetMapping("/listaCasasPorNombre/{nombreCasa}")
    public ResponseEntity<?> listaCasasPorNombre(@PathVariable(name = "nombreCasa") String nombreCasa) {
        return casaService.getCasaPorNombre(nombreCasa);
    }

    @GetMapping("/listaCasasUsuario/{email}")
    public ResponseEntity<?> listaCasasUsuario(
            @PathVariable(name = "email") String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return casaService.getListaCasasUsuario(email, page, size);
    }

    @GetMapping("/fotosCasa/{idCasa}")
    public ResponseEntity<?> fotosCasa(@PathVariable(name = "idCasa") Long idCasa) {
        return imagenService.getListaImagenesDeCasa(idCasa);
    }

    @GetMapping("/opinionCasa/{idCasa}")
    public ResponseEntity<?> OpinionesCasa(@PathVariable(name = "idCasa") Long idCasa) {
        return opinaService.getListaOpinionCasa(idCasa);
    }

    @GetMapping("/opinionCasaPage/{idCasa}")
    public ResponseEntity<?> OpinionesCasaPage(
            @PathVariable(name = "idCasa") Long idCasa,
            @PageableDefault(page = 0, size = 10) Pageable pageable) {

        return opinaService.getListaOpinionCasa(idCasa, pageable);
    }

    @GetMapping("/precioMaximo")
    public ResponseEntity<?> obtenerPrecioMaximo() {
        return casaService.obtenerPrecioMaximo();
    }

    @GetMapping("/precioMinimo")
    public ResponseEntity<?> obtenerPrecioMinimo() {
        return casaService.obtenerPrecioMinimo();
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
        return casaService.crearCasa(casaRequest);
    }

    @PostMapping("/subirImagenes")
    public ResponseEntity<?> subirImagenes(
            @RequestParam(value = "files", required = false) List<MultipartFile> files,
            @RequestParam("idCasa") Long idCasa,
            @RequestParam(value = "idsImagenes", required = false) List<Long> idsImagenes) {

        // Si idsImagenes es null, inicializa una lista vacía
        if (idsImagenes == null) {
            idsImagenes = new ArrayList<>();
        }

        // Si files es null, inicializa una lista vacía
        if (files == null) {
            files = new ArrayList<>();
        }

        boolean resultado = imagenService.subidaImagenes(files, idCasa, idsImagenes);
        if (resultado) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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

    @GetMapping("/datosCasa/{idCasa}")
    public ResponseEntity<?> datosCasa(@PathVariable(name = "idCasa") Long idCasa) {
        return casaService.obtenDatosCasa(idCasa);
    }

    @DeleteMapping("/eliminar/{idImagen}")
    public ResponseEntity<?> eliminarImagen(@PathVariable Long idImagen, @RequestParam Long idCasa) {
        boolean eliminada = imagenService.eliminarImagen(idImagen, idCasa);
        if (eliminada) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Imagen eliminada exitosamente");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(404).body("Imagen no encontrada o no pudo ser eliminada");
        }
    }

    @GetMapping("/alquileres/{gmail}")
    public ResponseEntity<?> getCasasByGmail(
            @PathVariable String gmail,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Map<String, Object>> casas = alquilaService.getCasasByGmail(gmail, pageable);
        return new ResponseEntity<>(casas, HttpStatus.OK);
    }

    @GetMapping("/casasIdAlquiladas")
    public List<Long> getCasasByFechas(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date fechaEntrada,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date fechaSalida) {
        return alquilaService.getCasaIdsByFechas(fechaEntrada, fechaSalida);
    }

    @DeleteMapping("/eliminar")
    public ResponseEntity<?> eliminarAlquiler(
            @RequestParam String gmail,
            @RequestParam Long idCasa,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fechaEntrada) {

        alquilaService.eliminarAlquiler(gmail, idCasa, fechaEntrada);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/eliminarCasa/{id}")
    public ResponseEntity<?> eliminarCasa(@PathVariable Long id) {
        casaService.eliminarCasaPorId(id);
        imagenService.eliminarCarpetaImagenes(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/por-mes")
    public ResponseEntity<?> obtenerAlquilerPorMes() {
        List<Object[]> alquileresPorMes = alquilaService.obtenerAlquilerPorMes();
        return ResponseEntity.ok(alquileresPorMes);
    }

    @GetMapping("/{idCasa}/publicador")
    public ResponseEntity<?> obtenerGmailPublicador(@PathVariable Long idCasa) {
        String gmailPublicador = casaService.obtenerGmailPublicador(idCasa);
        if (gmailPublicador != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", gmailPublicador);

            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/estados-casas/{gmail}")
    public ResponseEntity<?> getEstadosCasasByPropietario(@PathVariable String gmail) {
        List<String> estados = alquilaService.getEstadosByGmailPropietario(gmail);

        if (estados.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return new ResponseEntity<>(estados, HttpStatus.CREATED);
    }

    @GetMapping("/numero-solicitudes/{gmail}")
    public ResponseEntity<?> getNSolicitudes(@PathVariable String gmail) {
        Long estados = alquilaService.getNSolicitudes(gmail);

        return new ResponseEntity<>(estados, HttpStatus.CREATED);
    }

    @GetMapping("/estado-solicitudes-interesado/{gmail}")
    public ResponseEntity<?> getEstadosCasasByInteresado(@PathVariable String gmail) {
        List<String> estados = alquilaService.getEstadoPorInteresado(gmail);

        return new ResponseEntity<>(estados, HttpStatus.CREATED);
    }

    @PutMapping("/actualizar-estado")
    public ResponseEntity<?> actualizarEstado(@RequestParam Long idCasa, @RequestParam String gmail,
            @RequestParam String nuevoEstado) {
        alquilaService.actualizarEstadoPorIdCasaYGmail(idCasa, gmail, nuevoEstado);
        Map<String, String> response = new HashMap<>();
        response.put("message", "okey");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/casasInfoAlquiladas/{gmail}")
    public ResponseEntity<?> getInfoCasasPorEmailPropietario(
            @PathVariable String gmail,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return alquilaService.getListaCasaPorPropietario(gmail, page, size);
    }

}

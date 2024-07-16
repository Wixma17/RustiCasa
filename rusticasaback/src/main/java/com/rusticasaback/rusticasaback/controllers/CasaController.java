package com.rusticasaback.rusticasaback.controllers;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.rusticasaback.rusticasaback.DTOs.CasaDTO;
import com.rusticasaback.rusticasaback.DTOs.ClienteDTO;
import com.rusticasaback.rusticasaback.DTOs.ImagenDTO;
import com.rusticasaback.rusticasaback.DTOs.MunicipioDTO;
import com.rusticasaback.rusticasaback.Request.CasaRequest;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.repositories.ImagenRepository;
import com.rusticasaback.rusticasaback.services.CasaService;

@RestController
@RequestMapping("/api/casa")
@CrossOrigin
public class CasaController {

    @Autowired
    private CasaService casaService;

    private ImagenRepository imgRep;

    @GetMapping("/listaCasa/{email}")
    public ResponseEntity<?> listaCasa(@PathVariable(name = "email") String email) {
        return casaService.getListaCasa(email);
    }

   /* @PostMapping("/registrarCasa")
    public ResponseEntity<?> registrarCasa(@RequestBody CasaRequest casaRequest) {

        CasaEntity nuevaCasa = new CasaEntity(casaRequest.getCasaDto().getIdCasa(),
                casaRequest.getCasaDto().getDescripcion(),
                casaRequest.getCasaDto().getNombreCasa(),
                casaRequest.getCasaDto().isMascotas(),
                casaRequest.getMunicipio().createMunicipioEntity(),
                casaRequest.getCasaDto().getPrecioNoche(),
                casaRequest.getCasaDto().getNumeroHabitaciones(),
                casaRequest.getCasaDto().getNumeroInquilinos(),
                casaRequest.getCasaDto().isPiscina(), casaRequest.getCasaDto().isWifi(),
                casaRequest.getCasaDto().isJardin(),
                ImagenDTO.convertFromDtoList(casaRequest.getListaImagenes()),
                ClienteDTO.createClienteEntity(casaRequest.getClientePublicador()), new ArrayList<>(),
                new ArrayList<>());

        CasaEntity casaGuardada = casaService.guardaCasa(nuevaCasa);
        CasaRequest casaResultado = new CasaRequest(new CasaDTO(casaGuardada),
                new MunicipioDTO(casaGuardada.getMunicipio()),
                ImagenDTO.convertFromEntityList(casaGuardada.getListaImagenes()),
                new ClienteDTO(casaGuardada.getClientePublicador()));
        return new ResponseEntity<>(casaResultado, HttpStatus.CREATED);
    }*/

    @PostMapping("/registrarCasa")
    public ResponseEntity<?> registrarCasa(@RequestBody CasaRequest casaRequest,
    @RequestParam("files") List<MultipartFile> files) {

        ArrayList<ImagenDTO> listaImagenesSubidas = new ArrayList<ImagenDTO>();

        /* Subida de archivos */

        String uploadDir = casaRequest.getClientePublicador().getGmail() + "/";

        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }

        try {
            for (int i = 0; i < files.size(); i++) {
                String fileName = files.get(i).getOriginalFilename();
                File destinationFile = new File(uploadDir + fileName);
                files.get(i).transferTo(destinationFile);
                ImagenDTO imag = new ImagenDTO(null, fileName, i);
                listaImagenesSubidas.add(imag);

                // Guardar información en la base de datos                
                imgRep.save(ImagenDTO.createImagenEntity(imag));
            }

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al subir los archivos: " + e.getMessage());
        }
        /* Fin subida de archvos */

        CasaEntity nuevaCasa = new CasaEntity(casaRequest.getCasaDto().getIdCasa(),
                casaRequest.getCasaDto().getDescripcion(),
                casaRequest.getCasaDto().getNombreCasa(), casaRequest.getCasaDto().isMascotas(),
                casaRequest.getMunicipio().createMunicipioEntity(),
                casaRequest.getCasaDto().getPrecioNoche(), casaRequest.getCasaDto().getNumeroHabitaciones(),
                casaRequest.getCasaDto().getNumeroInquilinos(),
                casaRequest.getCasaDto().isPiscina(), casaRequest.getCasaDto().isWifi(),
                casaRequest.getCasaDto().isJardin(), ImagenDTO.convertFromDtoList(casaRequest.getListaImagenes()),
                ClienteDTO.createClienteEntity(casaRequest.getClientePublicador()), new ArrayList<>(),
                new ArrayList<>());

        CasaEntity casaGuardada = casaService.guardaCasa(nuevaCasa);
        CasaRequest casaResultado = new CasaRequest(new CasaDTO(casaGuardada),
                new MunicipioDTO(casaGuardada.getMunicipio()),
                ImagenDTO.convertFromEntityList(casaGuardada.getListaImagenes()),
                new ClienteDTO(casaGuardada.getClientePublicador()));
        return new ResponseEntity<>(casaResultado, HttpStatus.CREATED);
    }

}

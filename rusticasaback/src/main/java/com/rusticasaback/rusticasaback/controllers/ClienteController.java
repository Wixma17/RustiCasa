package com.rusticasaback.rusticasaback.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.services.ClienteService;
import com.rusticasaback.rusticasaback.services.ImagenService;

@RestController
@CrossOrigin
@RequestMapping("/api/cliente")
public class ClienteController {

    @Autowired
    private ImagenService imagenService;

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/fotoPerfil/{gmail}")
    public ResponseEntity<?> fotosCasa(@PathVariable(name = "gmail") String gmail) {
        String url = imagenService.getImagenPerfil(gmail);
        Map<String, String> response = new HashMap<>();
        response.put("urlImg", url);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/cliente/{gmail}")
    public ResponseEntity<?> getClienteExistente(@PathVariable(name = "gmail") String gmail) {

        Optional<ClienteEntity> cli = clienteService.verClienteExistente(gmail);

        if (cli.isPresent()) {            
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {        
            return new ResponseEntity<>(false, HttpStatus.OK);
        }

    }

}

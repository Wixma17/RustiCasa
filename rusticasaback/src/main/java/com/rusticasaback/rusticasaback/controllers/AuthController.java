package com.rusticasaback.rusticasaback.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.rusticasaback.rusticasaback.DTOs.ClienteDTO;
import com.rusticasaback.rusticasaback.Request.LoginRequest;
import com.rusticasaback.rusticasaback.Request.RegisterRequest;
import com.rusticasaback.rusticasaback.services.ClienteService;
import com.rusticasaback.rusticasaback.services.ImagenService;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ImagenService imagenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        ClienteDTO cli = clienteService.authenticate(loginRequest.getGmail(), loginRequest.getPasswd());
        return new ResponseEntity<>(cli, HttpStatus.CREATED);
    }

    @PostMapping("/registerUser")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        clienteService.crearCliente(registerRequest);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Cliente Subido");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/subirImagenesUser")
    public ResponseEntity<?> subirImagenes(
            @RequestParam("gmail") String gmail,
            @RequestParam("files") List<MultipartFile> files) {

        System.out.println("correo=> " + gmail);
        System.out.println("Fotos=> " + files);

        imagenService.subidaImagenPerfil(gmail, files);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Imagen actualizada");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/datosUsuario")
    public ResponseEntity<?> getDatosUsuario(@RequestBody String email) {
        return clienteService.recuperarDatos(email);
    }

}

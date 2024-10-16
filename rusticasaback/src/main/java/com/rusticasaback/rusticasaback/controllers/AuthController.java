package com.rusticasaback.rusticasaback.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.rusticasaback.rusticasaback.DTOs.ClienteDTO;
import com.rusticasaback.rusticasaback.Request.LoginRequest;
import com.rusticasaback.rusticasaback.Request.RegisterRequest;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.repositories.BloqueadosRepository;
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

    @Autowired
    private BloqueadosRepository bloqueadosRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest cliente) {
        ClienteDTO clienteDTO = clienteService.authenticate(cliente.getGmail(), cliente.getPasswd());

        if (clienteDTO != null) {
            return new ResponseEntity<>(clienteDTO, HttpStatus.OK);
        } else {
            boolean isBlocked = bloqueadosRepository.existsByGmailBloqueado(cliente.getGmail());
            if (isBlocked) {
                return new ResponseEntity<>("Usuario bloqueado", HttpStatus.FORBIDDEN);
            } else {
                return new ResponseEntity<>("Credenciales incorrectas", HttpStatus.UNAUTHORIZED);
            }
        }
    }

    @PostMapping("/registerUser")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        ClienteEntity clienteExistente;

        Optional<ClienteEntity> clienteExistenteOptional = clienteService
                .verClienteExistente(registerRequest.getGmail());
        if (!clienteExistenteOptional.isPresent()) {
            ClienteDTO c = clienteService.crearCliente(registerRequest);
            clienteExistente = c.createClienteEntity();
        } else {
            clienteExistente = clienteExistenteOptional.get();
            clienteExistente.setNombre(registerRequest.getNombre());
            clienteExistente.setApellido(registerRequest.getApellido());
            clienteExistente.setPasswd(registerRequest.getPasswd());
            clienteExistente.setNickname(registerRequest.getNickname());
            clienteExistente.setFechaNacimiento(registerRequest.getFechaNacimiento());
        }
        clienteService.guardaCliente(clienteExistente);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Cliente Subido");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/subirImagenesUser")
    public ResponseEntity<?> subirImagenes(
            @RequestParam("gmail") String gmail,
            @RequestParam("files") List<MultipartFile> files) {

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

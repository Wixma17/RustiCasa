package com.rusticasaback.rusticasaback.controllers;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rusticasaback.rusticasaback.services.BloqueadosService;

@RestController
@CrossOrigin
@RequestMapping("/api/bloqueados")
public class BloqueadosController {

    @Autowired
    private BloqueadosService bloqueadosService;

    // Endpoint para bloquear a un usuario
    @PostMapping("/bloquear/{gmail}")
    public ResponseEntity<?> bloquearUsuario(@PathVariable(name = "gmail") String email) {
        bloqueadosService.bloquearUsuario(email);
        return ResponseEntity.ok().build();
    }

    // Endpoint para eliminar un bloqueo
    @DeleteMapping("/eliminar")
    public ResponseEntity<?> eliminarBloqueo(@RequestParam String gmailBloqueado) {
        bloqueadosService.eliminarBloqueo(gmailBloqueado);
        Map<String, String> response = new HashMap<>();
        response.put("mensaje", "Se ha eliminado el bloqueo del cliente");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}

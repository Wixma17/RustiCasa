package com.rusticasaback.rusticasaback.controllers;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rusticasaback.rusticasaback.Request.BloqueoRequest;
import com.rusticasaback.rusticasaback.services.BloqueadosService;

@RestController
@CrossOrigin
@RequestMapping("/api/bloqueados")
public class BloqueadosController {

    @Autowired
    private BloqueadosService bloqueadosService;

    // Endpoint para bloquear a un usuario
    @PostMapping("/bloquear")
    public ResponseEntity<?> bloquearUsuario(@RequestBody BloqueoRequest bloqueoRequest) {
        try {
            bloqueadosService.bloquearUsuario(bloqueoRequest.getGmailBloqueado(),bloqueoRequest.getMotivo());
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            // Devolver un mensaje de error en caso de que el usuario no se encuentre
            Map<String, String> response = new HashMap<>();
            response.put("mensaje", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint para eliminar un bloqueo
    @DeleteMapping("/eliminar/{gmailBloqueado}")
    public ResponseEntity<?> eliminarBloqueo(@PathVariable String gmailBloqueado) {
        try {
            bloqueadosService.eliminarBloqueo(gmailBloqueado);
            Map<String, String> response = new HashMap<>();
            response.put("mensaje", "Se ha eliminado el bloqueo del cliente");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("mensaje", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/existeBloqueado/{gmailBloqueado}")
    public boolean verificarBloqueo(@PathVariable String gmailBloqueado) {
        return bloqueadosService.existeBloqueado(gmailBloqueado);
    }
}

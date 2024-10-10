package com.rusticasaback.rusticasaback.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rusticasaback.rusticasaback.Response.EmailResponse;
import com.rusticasaback.rusticasaback.services.EmailService;

@RestController
@CrossOrigin
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendEmail")
    public ResponseEntity<?> sendEmail(@RequestBody EmailResponse email) {
        emailService.sendSimpleEmail(email.getEmail(), email.getBody());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Revisa tu bandeja");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/acceptEmail")
    public ResponseEntity<?> acceptEmail(@RequestBody String email) {
        emailService.sendAcceptEmail(email);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Revisa tu bandeja");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/deniedEmail")
    public ResponseEntity<?> deniedEmail(@RequestBody String email) {
        emailService.sendDeniedEmail(email);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Revisa tu bandeja");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
}
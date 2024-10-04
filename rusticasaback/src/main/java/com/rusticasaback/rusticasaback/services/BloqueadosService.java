package com.rusticasaback.rusticasaback.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rusticasaback.rusticasaback.repositories.BloqueadosRepository;
import com.rusticasaback.rusticasaback.entities.BloqueadosEntity;

@Service
public class BloqueadosService {

    @Autowired
    private BloqueadosRepository bloqueadosRepository;

    // Método para bloquear un usuario
    public void bloquearUsuario(String email) {
        BloqueadosEntity bloqueado= bloqueadosRepository.findById(email).get();
        bloqueadosRepository.save(bloqueado);
    }

    // Método para eliminar un bloqueo entre un cliente y un emisor
    public void eliminarBloqueo(String gmailBloqueado) {
        bloqueadosRepository.deleteByGmailBloqueado(gmailBloqueado);
    }

}

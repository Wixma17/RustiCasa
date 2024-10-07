package com.rusticasaback.rusticasaback.services;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rusticasaback.rusticasaback.repositories.BloqueadosRepository;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;

import jakarta.transaction.Transactional;

import com.rusticasaback.rusticasaback.entities.BloqueadosEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;

@Service
public class BloqueadosService {

    @Autowired
    private BloqueadosRepository bloqueadosRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    // Método para bloquear un usuario
    public void bloquearUsuario(String email,String motivo) {

        ClienteEntity cli= clienteRepository.findById(email).get();
        
        BloqueadosEntity bloqueado= new BloqueadosEntity(cli.getGmail(),new Date(), motivo, cli);

        bloqueadosRepository.save(bloqueado);

        //clienteRepository.deleteById(email);
       
    }

    // Método para eliminar un bloqueo entre un cliente y un emisor
    @Transactional
    public void eliminarBloqueo(String gmailBloqueado) {
        bloqueadosRepository.deleteByGmailBloqueado(gmailBloqueado);
    }

    @Transactional
    public boolean existeBloqueado(String gmailReportado) {
        return bloqueadosRepository.existsByGmailBloqueado(gmailReportado);
    }

}

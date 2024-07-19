package com.rusticasaback.rusticasaback.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rusticasaback.rusticasaback.Request.MensajeRequest;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.entities.MensajeEntity;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;
import com.rusticasaback.rusticasaback.repositories.MensajeRepository;

@Service
public class MensajeService {

    @Autowired
    private MensajeRepository mensajeRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    public MensajeEntity guardaMensaje(MensajeEntity mensaje) {
        return mensajeRepository.save(mensaje);
    }

    public MensajeEntity crearMensaje(MensajeRequest mensajeRequest) {

        ClienteEntity clienteEmisor = clienteRepository.findById(mensajeRequest.getCodEmisor()).get();
        ClienteEntity clienteReceptor = clienteRepository.findById(mensajeRequest.getCodReceptor()).get();

        MensajeEntity nuevoMensaje = new MensajeEntity(mensajeRequest.getMensajeDTO().getIdMensaje(),
                mensajeRequest.getMensajeDTO().getTextoMensaje(), mensajeRequest.getMensajeDTO().getFechaMensaje(),
                clienteEmisor, clienteReceptor);

        return guardaMensaje(nuevoMensaje);
    }

}

package com.rusticasaback.rusticasaback.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.rusticasaback.rusticasaback.Request.OpinaRequest;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntity;
import com.rusticasaback.rusticasaback.repositories.CasaRepository;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;
import com.rusticasaback.rusticasaback.repositories.OpinaRepository;

@Service
public class OpinaService {

    @Autowired
    OpinaRepository opinaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private CasaRepository casaRepository;

    public OpinaEntity guardaOpinion(OpinaEntity opinion) {
        return opinaRepository.save(opinion);
    }

    public OpinaEntity creaOpinion(OpinaRequest opinaRequest) {

        ClienteEntity clienteOpinion = clienteRepository
                .findById(opinaRequest.getOpinaDTO().getOpinaEntityPK().getGmail()).get();

        CasaEntity casaOpinion = casaRepository.findById(opinaRequest.getOpinaDTO().getOpinaEntityPK().getIdCasa()).get();

        OpinaEntity opinion = new OpinaEntity(opinaRequest.getOpinaDTO().getOpinaEntityPK(),
                opinaRequest.getOpinaDTO().getTextoOpinion(), opinaRequest.getOpinaDTO().getPuntuacion(),
                clienteOpinion, casaOpinion);

        return guardaOpinion(opinion);
    }

}

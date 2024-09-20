package com.rusticasaback.rusticasaback.services;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.rusticasaback.rusticasaback.DTOs.OpinaDTO;
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

    public ResponseEntity<?> getListaOpinionCasa(Long idCasa){
        List<OpinaEntity> listCasa= opinaRepository.findByOpinaEntityPK_IdCasa(idCasa);
        ArrayList<OpinaDTO> listaOpinion=new ArrayList<OpinaDTO>();

        for (OpinaEntity op : listCasa) {
            listaOpinion.add(new OpinaDTO(op));
        }

        return new ResponseEntity<>(listaOpinion, HttpStatus.CREATED);
    }

    public ResponseEntity<Page<OpinaDTO>> getListaOpinionCasa(Long idCasa, Pageable pageable) {
        Page<OpinaEntity> pageCasa = opinaRepository.findByOpinaEntityPK_IdCasa(idCasa, pageable);
        Page<OpinaDTO> pageOpinion = pageCasa.map(OpinaDTO::new);
        
        return new ResponseEntity<>(pageOpinion, HttpStatus.OK);
    }
    

}

package com.rusticasaback.rusticasaback.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rusticasaback.rusticasaback.DTOs.CasaDTO;
import com.rusticasaback.rusticasaback.DTOs.ImagenDTO;
import com.rusticasaback.rusticasaback.Response.ImagenResponse;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ImagenEntity;
import com.rusticasaback.rusticasaback.repositories.CasaRepository;
import com.rusticasaback.rusticasaback.repositories.ImagenRepository;

@Service
public class ImagenService {

    @Autowired
    private ImagenRepository imagenRepository;

    @Autowired
    private CasaRepository casaRepository;

    public ResponseEntity<?> getListaImagenesDeCasa(Long idCasa) {
        CasaEntity casa = casaRepository.findById(idCasa).get();
        List<ImagenEntity> listaImagenesCasa = imagenRepository.findByCasaImagen(casa);

        ArrayList<ImagenResponse> listaImagenesCasaRep = new ArrayList<ImagenResponse>();
        for (ImagenEntity img : listaImagenesCasa) {
            ImagenDTO imagenDTO= new ImagenDTO(img);
            //Cambiar por si da error es una casaEntity
            CasaDTO casaDTO=new CasaDTO(casa);
            listaImagenesCasaRep.add(new ImagenResponse(imagenDTO,casaDTO));
        }

        return ResponseEntity.ok(listaImagenesCasaRep);
    }
}

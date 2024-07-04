package com.rusticasaback.rusticasaback.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
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
        CasaEntity casas = casaRepository.findById(idCasa).get();
        List<ImagenEntity> listaImagenesCasa = imagenRepository.findByCasaImagen(casas);

        ArrayList<ImagenResponse> listaImagenesCasaRep = new ArrayList<ImagenResponse>();
        for (ImagenEntity img : listaImagenesCasa) {
            listaImagenesCasaRep.add(new ImagenResponse(img.getIdImagen(),img.getNombreImagen(),img.getPosicionCarrusel(),img.getCasaImagen()));
        }

        return ResponseEntity.ok(listaImagenesCasaRep);
    }
}

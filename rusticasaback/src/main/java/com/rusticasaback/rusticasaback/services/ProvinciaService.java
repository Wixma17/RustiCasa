package com.rusticasaback.rusticasaback.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rusticasaback.rusticasaback.DTOs.ProvinciaDTO;
import com.rusticasaback.rusticasaback.entities.ProvinciaEntity;
import com.rusticasaback.rusticasaback.repositories.ProvinciaRepository;

@Service
public class ProvinciaService {
    
    @Autowired
    private ProvinciaRepository provinciaRepository;


    public ResponseEntity<?> getListaProvincias(){
        List<ProvinciaEntity> listaProv= provinciaRepository.findAll();
        ArrayList<ProvinciaDTO> listaProvDTO=new ArrayList<ProvinciaDTO>();

        for (ProvinciaEntity prov : listaProv) {
            listaProvDTO.add(new ProvinciaDTO(prov));
        }

        return new ResponseEntity<>(listaProvDTO, HttpStatus.CREATED);
    }

}

package com.rusticasaback.rusticasaback.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rusticasaback.rusticasaback.DTOs.MunicipioDTO;
import com.rusticasaback.rusticasaback.entities.MunicipioEntity;
import com.rusticasaback.rusticasaback.repositories.MunicipioRepository;

@Service
public class MunicipioService {

    @Autowired
    private MunicipioRepository municipioRepository;


    public ResponseEntity<?> getListaMunicipio(int idMunicipio){
        List<MunicipioEntity> listaMun= municipioRepository.findByProvinciaIdProvincia(idMunicipio);
        ArrayList<MunicipioDTO> listaMunDTO=new ArrayList<MunicipioDTO>();

        for (MunicipioEntity mun : listaMun) {
            listaMunDTO.add(new MunicipioDTO(mun));            
        }

        return new ResponseEntity<>(listaMunDTO, HttpStatus.CREATED);
    }

}

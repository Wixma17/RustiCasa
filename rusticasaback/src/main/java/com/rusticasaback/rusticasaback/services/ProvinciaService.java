package com.rusticasaback.rusticasaback.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.rusticasaback.rusticasaback.DTOs.ProvinciaDTO;
import com.rusticasaback.rusticasaback.entities.ProvinciaEntity;
import com.rusticasaback.rusticasaback.repositories.MunicipioRepository;
import com.rusticasaback.rusticasaback.repositories.ProvinciaRepository;

@Service
public class ProvinciaService {

    @Autowired
    private ProvinciaRepository provinciaRepository;

    @Autowired
    private MunicipioRepository municipioRepository;

    public ResponseEntity<?> getListaProvincias() {
        List<ProvinciaEntity> listaProv = provinciaRepository.findAll();
        ArrayList<ProvinciaDTO> listaProvDTO = new ArrayList<ProvinciaDTO>();

        for (ProvinciaEntity prov : listaProv) {
            listaProvDTO.add(new ProvinciaDTO(prov));
        }

        return new ResponseEntity<>(listaProvDTO, HttpStatus.CREATED);
    }

    public ResponseEntity<?> getNombreProv(int idProv) {
        String nombreProv = provinciaRepository.findById(idProv).get().getNombreProvincia();
        Map<String, String> response = new HashMap<>();
        response.put("nombre", nombreProv);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<?> getNombreProvPorIdMun(long idMun) {
        Long nombreProv = municipioRepository.findIdProvinciaByIdMunicipio(idMun);
        Map<String, Long> response = new HashMap<>();
        response.put("codProv", nombreProv);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}

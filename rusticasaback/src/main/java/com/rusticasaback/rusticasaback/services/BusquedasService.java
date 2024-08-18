package com.rusticasaback.rusticasaback.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.rusticasaback.rusticasaback.DTOs.CasaDTO;
import com.rusticasaback.rusticasaback.Request.CasaSimpleRequest;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.repositories.CasaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class BusquedasService {
    @Autowired
    private CasaRepository casaRepository;

    public ResponseEntity<?> getCasasByProvincia(int idProvincia) {
        List<CasaEntity> listaCasa = casaRepository.findByMunicipio_Provincia_IdProvincia(idProvincia);
        ArrayList<CasaDTO> listaCasaResp = new ArrayList<CasaDTO>();
        for (CasaEntity casa : listaCasa) {
            listaCasaResp.add(new CasaDTO(casa));
        }
        return new ResponseEntity<>(listaCasaResp, HttpStatus.CREATED);
    }

    public ResponseEntity<?> getCasasByFecha(Date checkIn, Date checkOut) {
        List<CasaEntity> listaCasa = casaRepository.findCasasDisponiblesByFechas(checkIn, checkOut);
        ArrayList<CasaDTO> listaCasaResp = new ArrayList<CasaDTO>();
        for (CasaEntity casa : listaCasa) {
            listaCasaResp.add(new CasaDTO(casa));
        }
        return new ResponseEntity<>(listaCasaResp, HttpStatus.CREATED);
    }

    public ResponseEntity<Page<CasaDTO>> getCasasByRequest(CasaSimpleRequest request, Pageable pageable) {

        Page<CasaEntity> pageCasa = casaRepository.findAvailableHouses(
                request.getCheckIn(),
                request.getCheckOut(),
                request.getCodProv(),
                request.getCodMun(),
                request.getNumInqui(),
                request.getNumHab(),
                pageable);

        // Convertir a DTO
        Page<CasaDTO> pageCasaDTO = pageCasa.map(CasaDTO::new);
        
        return new ResponseEntity<>(pageCasaDTO, HttpStatus.OK);
    }
}

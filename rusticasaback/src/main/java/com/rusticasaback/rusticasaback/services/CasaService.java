package com.rusticasaback.rusticasaback.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.rusticasaback.rusticasaback.DTOs.CasaDTO;
import com.rusticasaback.rusticasaback.Response.CasaResponse;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.repositories.CasaRepository;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;

@Service
public class CasaService {

    @Autowired
    private CasaRepository casaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    public ResponseEntity<?> getListaCasa(String gmail) {
        ClienteEntity cliente = clienteRepository.findById(gmail).get();
        List<CasaEntity> listaCasa = casaRepository.findByClientePublicador(cliente);
        ArrayList<CasaResponse> listaCasaResp = new ArrayList<CasaResponse>();
        for (CasaEntity casa : listaCasa) {
            CasaDTO casaDTO = new CasaDTO(casa);
            listaCasaResp.add(new CasaResponse(casaDTO));
        }

        return ResponseEntity.ok(listaCasaResp);
    }

    public CasaEntity guardaCasa(CasaEntity casa) {
        return casaRepository.save(casa);
    }

    public List<CasaEntity> getCasasFiltradas(boolean mascotas, boolean wifi, boolean jardin, boolean piscina,
            int precioMin, int precioMax, int inquilinos, int numHab) {

        List<CasaEntity> listaCasaFiltrada = casaRepository.findFiltrados(mascotas, wifi, jardin, piscina);

        if (inquilinos != 0) {
            listaCasaFiltrada = listaCasaFiltrada.stream()
                    .filter(c -> c.getNumeroInquilinos() == inquilinos)
                    .toList();
        }

        if (numHab != 0) {
            listaCasaFiltrada = listaCasaFiltrada.stream()
                    .filter(c -> c.getNumeroHabitaciones() == numHab)
                    .toList();
        }

        if (precioMax != 0) {
            listaCasaFiltrada = listaCasaFiltrada.stream()
                    .filter(c -> c.getPrecioNoche() >= precioMin && c.getPrecioNoche() <= precioMax)
                    .toList();
        }

        return listaCasaFiltrada;
    }

}

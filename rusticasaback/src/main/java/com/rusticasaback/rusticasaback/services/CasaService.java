package com.rusticasaback.rusticasaback.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.rusticasaback.rusticasaback.DTOs.CasaDTO;
import com.rusticasaback.rusticasaback.DTOs.ClienteDTO;
import com.rusticasaback.rusticasaback.DTOs.ImagenDTO;
import com.rusticasaback.rusticasaback.DTOs.MunicipioDTO;
import com.rusticasaback.rusticasaback.Request.CasaRequest;
import com.rusticasaback.rusticasaback.Response.CasaCompletaResponse;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.entities.MunicipioEntity;
import com.rusticasaback.rusticasaback.repositories.CasaRepository;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;
import com.rusticasaback.rusticasaback.repositories.MunicipioRepository;

@Service
public class CasaService {

    @Autowired
    private CasaRepository casaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private MunicipioRepository municipioRepository;

    public ResponseEntity<?> getListaCasas() {
        List<CasaEntity> listaCasa = casaRepository.findAll();
        ArrayList<CasaDTO> listaCasaResp = new ArrayList<CasaDTO>();
        for (CasaEntity casa : listaCasa) {
            listaCasaResp.add(new CasaDTO(casa));
        }
        return ResponseEntity.ok(listaCasaResp);
    }

    public ResponseEntity<?> getListaCasasUsuario(String gmail) {
        ClienteEntity cliente = clienteRepository.findById(gmail).get();
        List<CasaEntity> listaCasa = casaRepository.findByClientePublicador(cliente);
        ArrayList<CasaDTO> listaCasaResp = new ArrayList<CasaDTO>();
        for (CasaEntity casa : listaCasa) {
            listaCasaResp.add(new CasaDTO(casa));
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

    public CasaEntity crearCasa(CasaRequest casaRequest) {

        MunicipioEntity municipio = municipioRepository.findById(casaRequest.getIdMunicipio()).get();
        ClienteEntity cliente = clienteRepository.findById(casaRequest.getGmail()).get();

        CasaEntity nuevaCasa = new CasaEntity(casaRequest.getCasaDto().getIdCasa(),
                casaRequest.getCasaDto().getDescripcion(),
                casaRequest.getCasaDto().getNombreCasa(), casaRequest.getCasaDto().isMascotas(), municipio,
                casaRequest.getCasaDto().getPrecioNoche(), casaRequest.getCasaDto().getNumeroHabitaciones(),
                casaRequest.getCasaDto().getNumeroInquilinos(),
                casaRequest.getCasaDto().isPiscina(), casaRequest.getCasaDto().isWifi(),
                casaRequest.getCasaDto().isJardin(), new ArrayList<>(), cliente, new ArrayList<>(), new ArrayList<>());

        return guardaCasa(nuevaCasa);
    }

    public ResponseEntity<?> getCasa(Long codCasa) {
        CasaEntity casaEntity = casaRepository.findById(codCasa).get();

        CasaDTO casaDTO = new CasaDTO(casaEntity);
        ClienteDTO cliente = new ClienteDTO(casaEntity.getClientePublicador());
        MunicipioDTO municipio = new MunicipioDTO(casaEntity.getMunicipio());

        CasaCompletaResponse casaResultado = new CasaCompletaResponse(casaDTO, municipio,
                ImagenDTO.convertFromEntityList(casaEntity.getListaImagenes()), cliente);

        return new ResponseEntity<>(casaResultado, HttpStatus.CREATED);
    }

    public ResponseEntity<?> getCasaPorNombre(String nombreCasa) {
        List<CasaEntity> listaCasaEntity = casaRepository.findLikeNombreCasa(nombreCasa);

        ArrayList<CasaCompletaResponse> listaCasaResultado = new ArrayList<CasaCompletaResponse>();

        for (CasaEntity casa : listaCasaEntity) {

            CasaDTO casaDTO = new CasaDTO(casa);

            ClienteDTO cliente = new ClienteDTO(casa.getClientePublicador());

            MunicipioDTO municipio = new MunicipioDTO(casa.getMunicipio());

            CasaCompletaResponse casaResultado = new CasaCompletaResponse(casaDTO, municipio,
                    ImagenDTO.convertFromEntityList(casa.getListaImagenes()), cliente);

            listaCasaResultado.add(casaResultado);
        }

        return new ResponseEntity<>(listaCasaResultado, HttpStatus.CREATED);
    }
}

package com.rusticasaback.rusticasaback.services;

import java.util.ArrayList;
import java.util.Date;
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
import com.rusticasaback.rusticasaback.repositories.AlquilaRepository;
import com.rusticasaback.rusticasaback.repositories.CasaRepository;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;
import com.rusticasaback.rusticasaback.repositories.ImagenRepository;
import com.rusticasaback.rusticasaback.repositories.MunicipioRepository;
import com.rusticasaback.rusticasaback.repositories.OpinaRepository;

import jakarta.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class CasaService {

    @Autowired
    private CasaRepository casaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private MunicipioRepository municipioRepository;

    @Autowired
    private AlquilaRepository alquilaRepository;

    @Autowired
    private OpinaRepository opinaRepository;

    @Autowired
    private ImagenRepository imagenRepository;

    public ResponseEntity<?> getListaCasas() {
        List<CasaEntity> listaCasa = casaRepository.findAll();
        ArrayList<CasaDTO> listaCasaResp = new ArrayList<CasaDTO>();
        for (CasaEntity casa : listaCasa) {
            listaCasaResp.add(new CasaDTO(casa));
        }
        return ResponseEntity.ok(listaCasaResp);
    }

    public ResponseEntity<?> getListaCasasUsuario(String gmail, int page, int size) {
        ClienteEntity cliente = clienteRepository.findById(gmail)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Pageable pageable = PageRequest.of(page, size);

        Page<CasaEntity> listaCasa = casaRepository.findByClientePublicador(cliente, pageable);

        Page<CasaDTO> listaCasaResp = listaCasa.map(CasaDTO::new);

        return ResponseEntity.ok(listaCasaResp);
    }

    public CasaEntity guardaCasa(CasaEntity casa) {
        return casaRepository.save(casa);
    }

    public ResponseEntity<Page<CasaDTO>> getCasasFiltradas(
            Boolean mascotas,
            Boolean wifi,
            Boolean jardin,
            Boolean piscina,
            Integer precioMin,
            Integer precioMax,
            Integer inquilinos,
            Integer numHab,
            Date checkIn,
            Date checkOut,
            Integer codProv,
            Integer codMun,
            Pageable pageable) {

        // Llamar al método en el repositorio con todos los parámetros
        Page<CasaEntity> listaCasaFiltrada = casaRepository.findAvailableHouses(
                checkIn,
                checkOut,
                codProv,
                codMun,
                inquilinos,
                numHab,
                mascotas,
                wifi,
                jardin,
                piscina,
                precioMin,
                precioMax,
                pageable);

        // Devolver la lista filtrada envuelta en un ResponseEntity
        Page<CasaDTO> pageCasaDTO = listaCasaFiltrada.map(CasaDTO::new);

        return new ResponseEntity<>(pageCasaDTO, HttpStatus.OK);
    }

    public ResponseEntity<?> crearCasa(CasaRequest casaRequest) {

        MunicipioEntity municipio = municipioRepository.findById(casaRequest.getIdMunicipio()).get();
        ClienteEntity cliente = clienteRepository.findById(casaRequest.getGmail()).get();

        CasaEntity nuevaCasa = new CasaEntity(casaRequest.getIdCasa(),
                casaRequest.getDescripcion(),
                casaRequest.getNombreCasa(), casaRequest.isMascotas(), municipio,
                casaRequest.getPrecioNoche(), casaRequest.getNumeroHabitaciones(),
                casaRequest.getNumeroInquilinos(),
                casaRequest.isPiscina(), casaRequest.isWifi(),
                casaRequest.isJardin(), new ArrayList<>(), cliente, new ArrayList<>(), new ArrayList<>());

        guardaCasa(nuevaCasa);
        CasaDTO casaRegistrada = new CasaDTO(nuevaCasa);

        return new ResponseEntity<>(casaRegistrada, HttpStatus.CREATED);
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
        List<CasaEntity> listaCasa = casaRepository.findByNombreCasa(nombreCasa);
        ArrayList<CasaDTO> listaCasaResp = new ArrayList<CasaDTO>();
        for (CasaEntity casa : listaCasa) {
            listaCasaResp.add(new CasaDTO(casa));
        }
        return new ResponseEntity<>(listaCasaResp, HttpStatus.CREATED);
    }

    public ResponseEntity<?> obtenerPrecioMaximo() {
        int precioMaximo = casaRepository.findMaxPrecioNoche();
        return new ResponseEntity<>(precioMaximo, HttpStatus.CREATED);
    }

    public ResponseEntity<?> obtenerPrecioMinimo() {
        int precioMin = casaRepository.findMinPrecioNoche();
        return new ResponseEntity<>(precioMin, HttpStatus.CREATED);
    }

    public ResponseEntity<?> obtenDatosCasa(Long idCasa) {

        CasaDTO casa = new CasaDTO(casaRepository.findById(idCasa).get());

        return new ResponseEntity<>(casa, HttpStatus.CREATED);
    }

    @Transactional
    public void eliminarCasaPorId(Long idCasa) {
        // Eliminar las relaciones dependientes primero
        alquilaRepository.deleteByCasaId(idCasa); // Si tienes este método personalizado en AlquilaRepository
        opinaRepository.deleteByCasaId(idCasa); // Método en OpinaRepository
        imagenRepository.deleteByCasaId(idCasa); // Método en ImagenRepository

        // Luego eliminar la casa
        casaRepository.deleteById(idCasa);
    }

    public String obtenerGmailPublicador(Long idCasa) {
        return casaRepository.findGmailPublicadorByIdCasa(idCasa);
    }

}

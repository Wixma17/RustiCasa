package com.rusticasaback.rusticasaback.services;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.rusticasaback.rusticasaback.DTOs.AlquilaDTO;
import com.rusticasaback.rusticasaback.DTOs.MunicipioDTO;
import com.rusticasaback.rusticasaback.Request.AlquilaRequest;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.entities.MunicipioEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntityPK;
import com.rusticasaback.rusticasaback.repositories.AlquilaRepository;
import com.rusticasaback.rusticasaback.repositories.CasaRepository;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;

@Service
public class AlquilaService {

    @Autowired
    AlquilaRepository alquilaRepository;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    CasaRepository casaRepository;

    public AlquilaEntity guardaReserva(AlquilaEntity alquilaEntity) {
        return alquilaRepository.save(alquilaEntity);
    }

    public AlquilaEntity creaReserva(AlquilaRequest alquilaRequest) {
        ClienteEntity cliente = clienteRepository
                .findById(alquilaRequest.getGmail()).get();

        CasaEntity casa = casaRepository.findById(alquilaRequest.getIdCasa())
                .get();

        AlquilaEntity alquilaCasa = new AlquilaEntity(
                new AlquilaEntityPK(alquilaRequest.getGmail(), alquilaRequest.getIdCasa(),
                        alquilaRequest.getFechaEntrada()),
                alquilaRequest.getFechaSalida(), cliente, casa, alquilaRequest.getEstado());

        return guardaReserva(alquilaCasa);
    }

    public Page<Map<String, Object>> getCasasByGmail(String gmail, Pageable pageable) {
        Page<Object[]> results = alquilaRepository.findCasasByGmail(gmail, pageable);

        return results.map(result -> {
            CasaEntity casa = (CasaEntity) result[0];
            Date fechaEntrada = (Date) result[1];
            Date fechaSalida = (Date) result[2];

            Map<String, Object> casaMap = new HashMap<>();
            casaMap.put("idCasa", casa.getIdCasa());
            casaMap.put("nombreCasa", casa.getNombreCasa());
            casaMap.put("descripcion", casa.getDescripcion());
            casaMap.put("mascotas", casa.isMascotas());
            casaMap.put("fechaEntrada", fechaEntrada);
            casaMap.put("fechaSalida", fechaSalida);
            casaMap.put("numeroHabitaciones", casa.getNumeroHabitaciones());
            casaMap.put("numeroInquilinos", casa.getNumeroInquilinos());
            casaMap.put("precioNoche", casa.getPrecioNoche());

            // Convertir MunicipioEntity a MunicipioDTO
            MunicipioEntity municipioEntity = casa.getMunicipio();
            MunicipioDTO municipioDTO = new MunicipioDTO();
            municipioDTO.setIdMunicipio(municipioEntity.getIdMunicipio());
            municipioDTO.setMunicipio(municipioEntity.getMunicipio());
            municipioDTO.setMunicipioseo(municipioEntity.getMunicipioseo());
            municipioDTO.setPostal(municipioEntity.getPostal());
            municipioDTO.setLatitud(municipioEntity.getLatitud());
            municipioDTO.setLongitud(municipioEntity.getLongitud());

            casaMap.put("municipio", municipioDTO);

            return casaMap;
        });
    }

    public List<Long> getCasaIdsByFechas(Date fechaEntrada, Date fechaSalida) {
        return alquilaRepository.findCasaIdsByFechas(fechaEntrada, fechaSalida);
    }

    public void eliminarAlquiler(String gmail, Long idCasa, Date fechaEntrada) {
        System.out.println("gmail=> " + gmail);
        System.out.println("idCasa=> " + idCasa);
        System.out.println("fecha=> " + fechaEntrada);
        AlquilaEntityPK pk = new AlquilaEntityPK(gmail, idCasa, fechaEntrada);
        alquilaRepository.deleteById(pk);
    }

    public List<Object[]> obtenerAlquilerPorMes() {
        return alquilaRepository.findAlquilerPorMes();
    }

    public List<String> getEstadosByGmailPropietario(String gmail) {
        return alquilaRepository.findEstadoByGmail(gmail);
    }

    public Long getNSolicitudes(String gmail) {
        return alquilaRepository.countEstadoPByGmail(gmail);
    }

    public List<String> getEstadoPorInteresado(String gmail) {
        return alquilaRepository.findEstadosByGmailPropietario(gmail);
    }

    public void actualizarEstadoPorIdCasaYGmail(Long idCasa, String gmail, String nuevoEstado) {
        int filasActualizadas = alquilaRepository.updateEstadoByIdCasaAndGmail(idCasa, gmail, nuevoEstado);
        if (filasActualizadas > 0) {
            System.out.println("Estado actualizado correctamente.");
        } else {
            System.out.println("No se encontró ninguna entidad con el id de casa y gmail especificados.");
        }
    }
    

   public ResponseEntity<?> getListaCasaPorPropietario(@RequestParam String email, @RequestParam int page, @RequestParam int size) {
    // Crear el objeto Pageable con el número de página y el tamaño
    Pageable pageable = PageRequest.of(page, size);
    
    // Obtener la página de AlquilaEntity
    Page<AlquilaEntity> pageResult = alquilaRepository.findByCasaClientePublicadorGmailAndEstado(email, pageable);
    
    // Convertir la lista de AlquilaEntity a lista de AlquilaDTO
    List<AlquilaDTO> listaAlquilaDTO = AlquilaDTO.convertFromEntityList(pageResult.getContent());
    
    // Crear un objeto de respuesta con la información de paginación
    Map<String, Object> response = new HashMap<>();
    response.put("content", listaAlquilaDTO);
    response.put("currentPage", pageResult.getNumber());
    response.put("totalItems", pageResult.getTotalElements());
    response.put("totalPages", pageResult.getTotalPages());

    return new ResponseEntity<>(response, HttpStatus.OK);
}
}

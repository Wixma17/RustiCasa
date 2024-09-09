package com.rusticasaback.rusticasaback.DTOs;

import java.util.ArrayList;
import java.util.List;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CasaDTO {
    private Long idCasa;
    private String descripcion;
    private String nombreCasa;
    private boolean mascotas;
    private int precioNoche;
    private int numeroHabitaciones;
    private int numeroInquilinos;
    private boolean piscina;
    private boolean wifi;
    private boolean jardin;
    private MunicipioDTO municipio;

    public CasaDTO(CasaEntity casaEntity) {
        idCasa = casaEntity.getIdCasa();
        descripcion = casaEntity.getDescripcion();
        nombreCasa = casaEntity.getNombreCasa();
        mascotas = casaEntity.isMascotas();
        precioNoche = casaEntity.getPrecioNoche();
        numeroHabitaciones = casaEntity.getNumeroHabitaciones();
        numeroInquilinos = casaEntity.getNumeroInquilinos();
        piscina = casaEntity.isPiscina();
        wifi = casaEntity.isWifi();
        jardin = casaEntity.isJardin();   
        municipio= new MunicipioDTO(casaEntity.getMunicipio());
    }


    public CasaEntity createCasaEntity(){
        return new CasaEntity(idCasa, descripcion, nombreCasa, mascotas, null, precioNoche, numeroHabitaciones, numeroInquilinos, piscina, wifi, jardin, null, null, null, null);
    }

    public static CasaEntity createCasaEntity(CasaDTO casaDTO){
        return new CasaEntity(casaDTO.idCasa, casaDTO.descripcion, casaDTO.nombreCasa, casaDTO.mascotas, null, casaDTO.precioNoche, casaDTO.numeroHabitaciones, casaDTO.numeroInquilinos, casaDTO.piscina, casaDTO.wifi, casaDTO.jardin, null, null, null, null);
    }


    public static List<CasaEntity> convertFromDtoList(List<CasaDTO> listaDTO){
        List<CasaEntity> listaEntity = new ArrayList<>();
        listaDTO.forEach(c -> listaEntity.add(createCasaEntity(c)));
        return listaEntity;
    }

    public static List<CasaDTO> convertFromEntityList(List<CasaEntity> listaEntity){
        List<CasaDTO> listaDTO = new ArrayList<>();
        listaEntity.forEach(c -> listaDTO.add(new CasaDTO(c)));
        return listaDTO;
    }

}

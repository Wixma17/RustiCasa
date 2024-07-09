package com.rusticasaback.rusticasaback.DTOs;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
    }

    public CasaEntity createCasaEntity(){
        return new CasaEntity(idCasa, descripcion, nombreCasa, mascotas, null, precioNoche, numeroHabitaciones, numeroInquilinos, piscina, wifi, jardin, null, null, null, null);
    }

}

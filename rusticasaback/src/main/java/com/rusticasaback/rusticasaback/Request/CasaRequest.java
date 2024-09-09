package com.rusticasaback.rusticasaback.Request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CasaRequest {
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
    private int idMunicipio;    
    private String gmail;  
}
package com.rusticasaback.rusticasaback.Request;

import java.util.List;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.entities.ImagenEntity;
import com.rusticasaback.rusticasaback.entities.MunicipioEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntity;
import lombok.Data;

@Data
public class CasaRequest {
    private Long idCasa;
    private String descripcion;
    private String nombreCasa;
    private boolean mascotas;
    private MunicipioEntity municipio; 
    private int precioNoche;
    private int numeroHabitaciones;
    private int numeroInquilinos;   
    private boolean piscina;
    private boolean wifi;
    private boolean jardin;
    private List<ImagenEntity> listaImagenes; 
    private ClienteEntity clientePublicador; 
    private List<AlquilaEntity> listaAlquilado; 
    private List<OpinaEntity> listaCasaOpinion; 
}
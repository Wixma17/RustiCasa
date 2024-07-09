package com.rusticasaback.rusticasaback.Request;

import java.util.List;

import com.rusticasaback.rusticasaback.DTOs.AlquilaDTO;
import com.rusticasaback.rusticasaback.DTOs.CasaDTO;
import com.rusticasaback.rusticasaback.DTOs.ImagenDTO;
import com.rusticasaback.rusticasaback.DTOs.MunicipioDTO;
import com.rusticasaback.rusticasaback.DTOs.OpinaDTO;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CasaRequest {
    private CasaDTO casaDto;
    private MunicipioDTO municipio;
    private List<ImagenDTO> listaImagenes; //Cambio
    private ClienteEntity clientePublicador; 
    private List<AlquilaDTO> listaAlquilado; //Cambio
    private List<OpinaDTO> listaCasaOpinion; //Cambio
}
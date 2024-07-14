package com.rusticasaback.rusticasaback.Request;

import java.util.List;
import com.rusticasaback.rusticasaback.DTOs.CasaDTO;
import com.rusticasaback.rusticasaback.DTOs.ClienteDTO;
import com.rusticasaback.rusticasaback.DTOs.ImagenDTO;
import com.rusticasaback.rusticasaback.DTOs.MunicipioDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CasaRequest {
    private CasaDTO casaDto;
    private MunicipioDTO municipio;
    private List<ImagenDTO> listaImagenes;
    private ClienteDTO clientePublicador;    
}
package com.rusticasaback.rusticasaback.Response;
import java.util.List;

import com.rusticasaback.rusticasaback.DTOs.CasaDTO;
import com.rusticasaback.rusticasaback.DTOs.ClienteDTO;
import com.rusticasaback.rusticasaback.DTOs.ImagenDTO;
import com.rusticasaback.rusticasaback.DTOs.MunicipioDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CasaCompletaResponse {
    private CasaDTO casaDto;
    private MunicipioDTO municipio;
    private List<ImagenDTO> listaImagenes;
    private ClienteDTO clientePublicador;
}
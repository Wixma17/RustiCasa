package com.rusticasaback.rusticasaback.Request;

import com.rusticasaback.rusticasaback.DTOs.CasaDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CasaRequest {
    private CasaDTO casaDto;
    private int idMunicipio;    
    private String gmail;  
}
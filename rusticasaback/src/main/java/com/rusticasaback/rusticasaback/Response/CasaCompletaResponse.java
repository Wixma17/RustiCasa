package com.rusticasaback.rusticasaback.Response;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.rusticasaback.rusticasaback.DTOs.CasaDTO;
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
    private List<MultipartFile> listaImagenes;
    private String clientePublicador;
}
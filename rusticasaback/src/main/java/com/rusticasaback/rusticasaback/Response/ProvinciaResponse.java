package com.rusticasaback.rusticasaback.Response;

import com.rusticasaback.rusticasaback.DTOs.ProvinciaDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProvinciaResponse {
    private ProvinciaDTO provinciaDTO;
}

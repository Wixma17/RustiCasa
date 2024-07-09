package com.rusticasaback.rusticasaback.Response;
import com.rusticasaback.rusticasaback.DTOs.CasaDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CasaResponse {
    private CasaDTO casaDTO;
}

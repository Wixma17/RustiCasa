package com.rusticasaback.rusticasaback.Response;

import com.rusticasaback.rusticasaback.DTOs.MunicipioDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class municipioResponse {
    private MunicipioDTO municipioDTO;
}

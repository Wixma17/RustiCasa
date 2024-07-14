package com.rusticasaback.rusticasaback.Request;

import com.rusticasaback.rusticasaback.DTOs.ClienteDTO;
import lombok.Data;

@Data
public class RegisterRequest {
    private ClienteDTO clienteDTO;
}

package com.rusticasaback.rusticasaback.Request;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CasaSimpleRequest {
    private int codProv;
    private int codMun;
    private Date checkIn;
    private Date checkOut;
}

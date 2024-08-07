package com.rusticasaback.rusticasaback.Request;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CasaSimpleRequest {
    private Integer codProv;
    private Integer codMun;
    private Date checkIn;
    private Date checkOut;
    private Integer numInqui;
    private Integer numHab;
}

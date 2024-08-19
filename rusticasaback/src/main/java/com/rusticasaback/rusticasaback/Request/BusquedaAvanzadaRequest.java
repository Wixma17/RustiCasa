package com.rusticasaback.rusticasaback.Request;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BusquedaAvanzadaRequest {
    private Boolean mascotas;
    private Boolean wifi;
    private Boolean jardin;
    private Boolean piscina;
    private Integer precioMin;
    private Integer precioMax;
    private Integer inquilinos;
    private Integer numHab;
    private Date checkIn;
    private Date checkOut;
    private Integer codProv;
    private Integer codMun;
    private Integer page;
}

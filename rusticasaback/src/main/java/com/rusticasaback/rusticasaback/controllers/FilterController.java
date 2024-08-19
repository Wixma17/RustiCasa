package com.rusticasaback.rusticasaback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import com.rusticasaback.rusticasaback.Request.BusquedaAvanzadaRequest;
import com.rusticasaback.rusticasaback.Request.CasaSimpleRequest;
import com.rusticasaback.rusticasaback.services.BusquedasService;
import com.rusticasaback.rusticasaback.services.CasaService;

@RestController
@CrossOrigin
@RequestMapping("/api/filtro")
public class FilterController {

    @Autowired
    private CasaService casaService;

    @Autowired
    private BusquedasService busquedasService;

    @PostMapping("/busquedasAvanzada")
    public ResponseEntity<?> getCasasFiltradas(
            @RequestBody BusquedaAvanzadaRequest requestAvanzada,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        if (requestAvanzada.getPage() != null) {
            page = requestAvanzada.getPage();
        }

        Pageable pageable = PageRequest.of(page, size);

        return casaService.getCasasFiltradas(
                requestAvanzada.getMascotas(), requestAvanzada.getWifi(), requestAvanzada.getJardin(),
                requestAvanzada.getPiscina(), requestAvanzada.getPrecioMin(), requestAvanzada.getPrecioMax(),
                requestAvanzada.getInquilinos(), requestAvanzada.getNumHab(), requestAvanzada.getCheckIn(),
                requestAvanzada.getCheckOut(), requestAvanzada.getCodProv(), requestAvanzada.getCodMun(), pageable);
    }

    @PostMapping("/busquedaSimple")
    public ResponseEntity<?> getCasasBusquedaSimple(@RequestBody CasaSimpleRequest request,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        if (request.getPage() != null) {
            page = request.getPage();
        }
        Pageable pageable = PageRequest.of(page, size);
        return busquedasService.getCasasByRequest(request, pageable);
    }

}

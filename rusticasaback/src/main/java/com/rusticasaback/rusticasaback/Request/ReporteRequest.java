package com.rusticasaback.rusticasaback.Request;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReporteRequest {
    private String gmailReportado;    
    private String emisor;
    private Date fechaReporte;
    private String motivo;
}

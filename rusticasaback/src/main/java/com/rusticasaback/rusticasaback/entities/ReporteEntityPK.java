package com.rusticasaback.rusticasaback.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReporteEntityPK {
    @Column(name = "gmail_reportado")
    private String gmailReportado;

    @Column(name = "emisor")
    private String emisor;
}

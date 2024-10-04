package com.rusticasaback.rusticasaback.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "reporte")
public class ReporteEntity {

    @Id
    @Column(name = "gmail", nullable = false)
    private String gmail;

    @Column(name = "n_reportes", nullable = false, columnDefinition = "int default 0")
    private int nReportes;

    @Column(name = "fecha_reporte")
    private Date fechaReporte;

    @Column(name = "motivo")
    private String motivo;

    @ManyToOne
    @JoinColumn(name = "emisor", referencedColumnName = "gmail")
    private ClienteEntity emisor;

    @ManyToOne
    @JoinColumn(name = "gmail", insertable = false, updatable = false)
    private ClienteEntity clienteReportado;

}

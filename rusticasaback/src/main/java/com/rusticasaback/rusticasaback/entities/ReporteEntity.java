package com.rusticasaback.rusticasaback.entities;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
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

    @EmbeddedId
    private ReporteEntityPK reporteEntityPK;

    @Column(name = "fecha_reporte")
    private Date fechaReporte;

    @Column(name = "motivo")
    private String motivo;

    @ManyToOne
    @JoinColumn(name = "gmail_reportado", insertable = false, updatable = false)
    private ClienteEntity clienteReportado;

    @ManyToOne
    @JoinColumn(name = "emisor", insertable = false, updatable = false)
    private ClienteEntity emisorEntity;

}

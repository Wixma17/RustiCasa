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
@Table(name = "bloqueados")
public class BloqueadosEntity {

    @Id
    @Column(name = "gmail_bloqueado", nullable = false)
    private String gmailBloqueado;

    @Column(name = "fecha_bloqueo", nullable = false, columnDefinition = "DATE DEFAULT CURRENT_DATE")
    private Date fechaBloqueo;

    @Column(name = "motivo", length = 255)
    private String motivo;

    @ManyToOne
    @JoinColumn(name = "gmail_bloqueado", insertable = false, updatable = false)
    private ClienteEntity clienteBloqueado;
}

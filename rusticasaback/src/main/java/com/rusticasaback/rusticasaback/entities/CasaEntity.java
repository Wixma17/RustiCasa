package com.rusticasaback.rusticasaback.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "casa")
public class CasaEntity {

    @Id
    @Column(name = "idCasa", nullable = false)
    private int idCasa;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "nombreCasa")
    private String nombreCasa;

    @Column(name = "mascotas")
    private boolean mascotas;
}

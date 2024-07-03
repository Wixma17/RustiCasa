package com.rusticasaback.rusticasaback.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @Column(name = "id_casa", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_casa;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "nombre_casa")
    private String nombre_casa;

    @Column(name = "mascotas")
    private boolean mascotas;

    @ManyToOne
    @JoinColumn(name = "gmail")
    private ClienteEntity cliente;
}

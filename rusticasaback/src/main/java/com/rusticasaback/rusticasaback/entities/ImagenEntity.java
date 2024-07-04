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
@Table(name = "imagen")
public class ImagenEntity {

    @Id
    @Column(name = "id_imagen", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idImagen;

    @Column(name = "nombre_imagen")
    private String nombreImagen;

    @Column(name = "posicion_carrusel")
    private int posicionCarrusel;


    @ManyToOne
    @JoinColumn(name = "id_casa")
    private CasaEntity casaImagen;

}

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
@Table(name = "imagen")
public class ImagenEntity {

    @Id
    @Column(name = "idImagen", nullable = false)
    private int idImagen;

    @Column(name = "nombreImagen")
    private String nombreImagen;

    @Column(name = "idCasa")
    private int idCasa; //FOREIGN KEY (idCasa) REFERENCES Casa(idCasa)

}

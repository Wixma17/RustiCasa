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
@Table(name = "municipio")
public class MunicipioEntity {

    @Id
    @Column(name = "idMunicipio", nullable = false)
    private int idMunicipio;

    @Column(name = "idProvincia")
    private int idProvincia;//FOREIGN KEY (idProvincia) REFERENCES Provincia(idProvincia)

    @Column(name = "municipio")
    private String municipio;

    @Column(name = "municipioseo")
    private String municipioseo;

    @Column(name = "postal")
    private int postal;

    @Column(name = "latitud")
    private double latitud;

    @Column(name = "longitud")
    private double longitud;

}

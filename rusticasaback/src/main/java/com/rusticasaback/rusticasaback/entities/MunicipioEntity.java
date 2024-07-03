package com.rusticasaback.rusticasaback.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    @Column(name = "id_municipio", nullable = false)
    private int idMunicipio;

    @Column(name = "municipio")
    private String municipio;

    @Column(name = "municipio_seo")
    private String municipioseo;

    @Column(name = "postal")
    private int postal;

    @Column(name = "latitud")
    private double latitud;

    @Column(name = "longitud")
    private double longitud;

    @ManyToOne
    @JoinColumn(name = "id_provincia")
    private ProvinciaEntity provincia;

    @OneToMany(mappedBy = "municipio")
    private List<CasaEntity> listaCasa;

}

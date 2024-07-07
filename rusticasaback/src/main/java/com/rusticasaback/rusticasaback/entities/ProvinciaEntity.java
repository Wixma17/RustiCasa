package com.rusticasaback.rusticasaback.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
@Table(name = "provincia")
public class ProvinciaEntity {

    @Id
    @Column(name = "id_provincia", nullable = false)
    private int idPronvincia;

    @Column(name = "provincia")
    private String nombreProvincia;

    @Column(name = "provincia_seo")
    private String nombreProvinciaSeo;

    @Column(name = "provincia3")
    private String nombreProvincia3;

    @Column(name = "comunidad")
    private String comunidad;

    @OneToMany(mappedBy = "provincia")
    private List<MunicipioEntity> listaMunicipios;

}

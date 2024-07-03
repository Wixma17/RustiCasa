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
    @Column(name = "id_pronvincia", nullable = false)
    private int idPronvincia;

    @Column(name = "nombre_provincia")
    private String nombreProvincia;

    @OneToMany(mappedBy = "provincia")
    private List<MunicipioEntity> listaMunicipios;

}

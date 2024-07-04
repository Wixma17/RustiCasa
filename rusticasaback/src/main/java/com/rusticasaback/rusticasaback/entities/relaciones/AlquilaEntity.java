package com.rusticasaback.rusticasaback.entities.relaciones;

import java.util.Date;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
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
@Table(name = "alquila")
public class AlquilaEntity {

    @EmbeddedId
    private AlquilaEntityPK alquilaEntityPK;

    @Column(name = "fecha_salida")
    private Date fechaSalida;

    @ManyToOne
    @MapsId("gmail")
    @JoinColumn(name = "gmail", referencedColumnName = "gmail")
    private ClienteEntity cliente;

    @ManyToOne
    @MapsId("idCasa")
    @JoinColumn(name = "id_casa", referencedColumnName = "id_casa")
    private CasaEntity casa;

}

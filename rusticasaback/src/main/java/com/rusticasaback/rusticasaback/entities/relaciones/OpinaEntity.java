package com.rusticasaback.rusticasaback.entities.relaciones;

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
@Table(name = "opina")
public class OpinaEntity {
    @EmbeddedId
    private OpinaEntityPK opinaEntityPK;

    @Column(name = "texto_opinion")
    private String textoOpinion;

    @Column(name = "puntuacion_casa")
    private double puntuacionCasa;

    @ManyToOne
    @MapsId("gmail")
    @JoinColumn(name = "gmail", referencedColumnName = "gmail")
    private ClienteEntity clienteOpinion;

    @ManyToOne
    @MapsId("idCasa")
    @JoinColumn(name = "id_casa", referencedColumnName = "id_casa")
    private CasaEntity casaOpinion;
}

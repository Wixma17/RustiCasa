package com.rusticasaback.rusticasaback.entities.relaciones;

import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
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
@Table(name = "opina")
public class OpinaEntity {
    @EmbeddedId
    private OpinaEntityPK opinaEntityPK;

    @Column(name = "texto_opinion")
    private String textoOpinion;

    @ManyToOne
    @JoinColumn(name = "gmail")
    private ClienteEntity clienteOpinion;

    @ManyToOne
    @JoinColumn(name = "id_casa")
    private CasaEntity casaOpinion;
}

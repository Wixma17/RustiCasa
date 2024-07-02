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
@Table(name = "opinion")
public class OpinionEntity {

    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "textoOpinion")
    private String textoOpinion;

    @Column(name = "idCasa")
    private int idCasa; //FOREIGN KEY (idCasa) REFERENCES Casa(idCasa)

    @Column(name = "gmail")
    private String gmail;// FOREIGN KEY (gmail) REFERENCES Cliente(gmail)

}

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
@Table(name = "mensaje")
public class MensajeEntity {
    
    @Id
    @Column(name = "idMensaje", nullable = false)
    private int idMensaje;

    @Column(name = "textoMensaje")
    private String textoMensaje;

    @Column(name = "gmail")
    private String gmail;// FOREIGN KEY (gmail) REFERENCES Cliente(gmail)

}

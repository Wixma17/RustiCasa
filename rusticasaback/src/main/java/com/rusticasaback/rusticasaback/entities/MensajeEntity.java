package com.rusticasaback.rusticasaback.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "mensaje")
public class MensajeEntity {

    @Id
    @Column(name = "id_mensaje", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMensaje;

    @Column(name = "texto_mensaje")
    private String textoMensaje;

    @ManyToOne
    @JoinColumn(name = "emisor")
    private ClienteEntity clienteEmisor;

    @ManyToOne
    @JoinColumn(name = "receptor")
    private ClienteEntity clienteReceptor;

}

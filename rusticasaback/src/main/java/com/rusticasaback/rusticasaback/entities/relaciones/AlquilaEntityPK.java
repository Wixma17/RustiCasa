package com.rusticasaback.rusticasaback.entities.relaciones;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlquilaEntityPK {

    @Column(name = "gmail")
    private String gmail;

    @Column(name = "id_casa")
    private Long idCasa;

    @Column(name = "fecha_entrada")
    private Date fechaEntrada;
}

package com.rusticasaback.rusticasaback.entities.relaciones;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpinaEntityPK {
    
    @Column(name = "id_casa")
    private Long idCasa;

    @Column(name = "gmail")
    private String gmail;
}

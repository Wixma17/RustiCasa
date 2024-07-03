package com.rusticasaback.rusticasaback.entities;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
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
@Table(name = "cliente")
public class ClienteEntity {
    @Id
    @Column(name = "gmail", nullable = false)
    private String gmail;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "passwd")
    private String passwd;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "administrador")
    private boolean administrador;

    @Column(name = "fecha_nacimiento")
    private Date fecha_nacimiento;

    @OneToMany(mappedBy = "cliente",cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<CasaEntity> casas;

}

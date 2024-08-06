package com.rusticasaback.rusticasaback.entities;

import java.util.Date;
import java.util.List;

import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntity;

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
    private Date fechaNacimiento;

    @Column(name = "imagen")
    private String imagen;

    @OneToMany(mappedBy = "clienteEmisor")
    private List<MensajeEntity> listaMensajeEnviados;

    @OneToMany(mappedBy = "clienteReceptor")
    private List<MensajeEntity> listaMensajeRecibidos;

    @OneToMany(mappedBy = "clientePublicador")
    private List<CasaEntity> listaCasaPublicadas;

    @OneToMany(mappedBy = "cliente")
    private List<AlquilaEntity> listaAlquilados;

    @OneToMany(mappedBy = "clienteOpinion")
    private List<OpinaEntity> listaClienteOpinion;
}

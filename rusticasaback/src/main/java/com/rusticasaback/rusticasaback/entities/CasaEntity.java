package com.rusticasaback.rusticasaback.entities;

import java.util.List;
import com.rusticasaback.rusticasaback.entities.relaciones.AlquilaEntity;
import com.rusticasaback.rusticasaback.entities.relaciones.OpinaEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "casa")
public class CasaEntity {

    @Id
    @Column(name = "id_casa", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCasa;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "nombre_casa")
    private String nombreCasa;

    @Column(name = "mascotas")
    private boolean mascotas;

    @ManyToOne
    @JoinColumn(name = "id_municipio")    
    private MunicipioEntity municipio;

    @Column(name = "precio_noche")
    private int precioNoche;

    @Column(name = "numero_habitaciones")
    private int numeroHabitaciones;

    @Column(name = "numero_inquilinos")
    private int numeroInquilinos;   

    @Column(name = "piscina")
    private boolean piscina;

    @Column(name = "wifi")
    private boolean wifi;

    @Column(name = "jardin")
    private boolean jardin;

    @OneToMany(mappedBy = "casaImagen")
    private List<ImagenEntity> listaImagenes; /* Preguntar Si esto haria un problemas de JSON infinitos */

    @ManyToOne
    @JoinColumn(name = "gmail") 
    private ClienteEntity clientePublicador; /* Preguntar Si esto haria un problemas de JSON infinitos */

    @OneToMany(mappedBy = "casa")
    private List<AlquilaEntity> listaAlquilado; /* Preguntar Si esto haria un problemas de JSON infinitos */

    @OneToMany(mappedBy = "casaOpinion")
    private List<OpinaEntity> listaCasaOpinion; /* Preguntar Si esto haria un problemas de JSON infinitos */

}

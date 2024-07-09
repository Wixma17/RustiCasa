package com.rusticasaback.rusticasaback.DTOs;

import com.rusticasaback.rusticasaback.entities.ImagenEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImagenDTO {
    private Long idImagen;
    private String nombreImagen;
    private int posicionCarrusel;

    public ImagenDTO(ImagenEntity imagenEntity) {
        idImagen = imagenEntity.getIdImagen();
        nombreImagen = imagenEntity.getNombreImagen();
        posicionCarrusel = imagenEntity.getPosicionCarrusel();
    }

    public ImagenEntity createImagenEntity(){
        return new ImagenEntity(idImagen, nombreImagen, posicionCarrusel, null);
    }
}

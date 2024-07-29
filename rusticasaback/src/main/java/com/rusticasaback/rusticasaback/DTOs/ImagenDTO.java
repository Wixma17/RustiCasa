package com.rusticasaback.rusticasaback.DTOs;

import java.util.ArrayList;
import java.util.List;
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

    public ImagenEntity createImagenEntity() {
        return new ImagenEntity(idImagen, nombreImagen, posicionCarrusel ,null);
    }

    public static ImagenEntity createImagenEntity(ImagenDTO imagenDTO) {
        return new ImagenEntity(imagenDTO.idImagen, imagenDTO.nombreImagen, imagenDTO.posicionCarrusel ,null);
    }

    public static List<ImagenEntity> convertFromDtoList(List<ImagenDTO> listaDTO) {
        List<ImagenEntity> listaEntity = new ArrayList<>();
        listaDTO.forEach(i -> listaEntity.add(createImagenEntity(i)));
        return listaEntity;
    }

    public static List<ImagenDTO> convertFromEntityList(List<ImagenEntity> listaEntity) {
        List<ImagenDTO> listaDTO = new ArrayList<>();
        listaEntity.forEach(i -> listaDTO.add(new ImagenDTO(i)));
        return listaDTO;
    }
}

package com.rusticasaback.rusticasaback.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.rusticasaback.rusticasaback.DTOs.ImagenDTO;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ImagenEntity;
import com.rusticasaback.rusticasaback.repositories.CasaRepository;
import com.rusticasaback.rusticasaback.repositories.ImagenRepository;

@Service
public class ImagenService {

    @Autowired
    private ImagenRepository imagenRepository;

    @Autowired
    private CasaRepository casaRepository;

    public ResponseEntity<?> getListaImagenesDeCasa(Long idCasa) {
        CasaEntity casa = casaRepository.findById(idCasa).get();
        List<ImagenEntity> listaImagenesCasa = imagenRepository.findByCasaImagen(casa);
        ArrayList<ImagenDTO> listaImagenesCasaRep = new ArrayList<ImagenDTO>();
        for (ImagenEntity img : listaImagenesCasa) {
            listaImagenesCasaRep.add(new ImagenDTO(img));
        }
        return ResponseEntity.ok(listaImagenesCasaRep);
    }

    public boolean subidaImagenes(List<MultipartFile> files, Long idCasa) {
        ArrayList<ImagenDTO> listaImagenesSubidas = new ArrayList<ImagenDTO>();

        CasaEntity casaEntity = casaRepository.findById(idCasa).get();

        /* Subida de archivos */

        String ruta = "FotosCasas/" + idCasa+ "/";

        File uploadDirFile = new File(ruta);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }

        Path uploadDir = Paths.get(ruta);
        try {

            Files.createDirectories(uploadDir);

            for (int i = 0; i < files.size(); i++) {
                @SuppressWarnings("null")
                String fileName = StringUtils.cleanPath(files.get(i).getOriginalFilename());

                Path filePath = uploadDir.resolve(fileName);
                Files.copy(files.get(i).getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                ImagenDTO imag = new ImagenDTO(null, fileName, i);
                listaImagenesSubidas.add(imag);

                // Guardar información en la base de datos
                ImagenEntity imgEntity = ImagenDTO.createImagenEntity(imag);
                imgEntity.setCasaImagen(casaEntity);
                imagenRepository.save(imgEntity);
            }

            // Asignar lista de imagenes subidas a la casa
            casaEntity.setListaImagenes(ImagenDTO.convertFromDtoList(listaImagenesSubidas));
            casaRepository.save(casaEntity);

            return true;
        } catch (IOException e) {
            return false;
        }
        /* Fin subida de archvos */
    }
}

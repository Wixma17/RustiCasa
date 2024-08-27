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
import com.rusticasaback.rusticasaback.Response.ImagenResponse;
import com.rusticasaback.rusticasaback.entities.CasaEntity;
import com.rusticasaback.rusticasaback.entities.ClienteEntity;
import com.rusticasaback.rusticasaback.entities.ImagenEntity;
import com.rusticasaback.rusticasaback.repositories.CasaRepository;
import com.rusticasaback.rusticasaback.repositories.ClienteRepository;
import com.rusticasaback.rusticasaback.repositories.ImagenRepository;

@Service
public class ImagenService {

    @Autowired
    private ImagenRepository imagenRepository;

    @Autowired
    private CasaRepository casaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    public ResponseEntity<?> getListaImagenesDeCasa(Long idCasa) {
        CasaEntity casa = casaRepository.findById(idCasa).get();
        List<ImagenEntity> listaImagenesCasa = imagenRepository.findByCasaImagen(casa);

        ArrayList<ImagenResponse> listaImagenesCasaRep = new ArrayList<ImagenResponse>();
        for (ImagenEntity img : listaImagenesCasa) {
            ImagenDTO imagenDTO = new ImagenDTO(img);
            listaImagenesCasaRep.add(new ImagenResponse(imagenDTO.getIdImagen(),
                    "http://localhost:8082/FotosCasas/" + idCasa + "/" + imagenDTO.getNombreImagen(),
                    imagenDTO.getPosicionCarrusel()));
        }

        return ResponseEntity.ok(listaImagenesCasaRep);
    }

    public boolean subidaImagenPerfil(String gmail, List<MultipartFile> files) {
        // Busca el cliente usando el gmail
        ClienteEntity clienteEntity = clienteRepository.findById(gmail).orElse(null);
        if (clienteEntity == null) {
            return false; // Cliente no encontrado
        }
    
        // Define la ruta para guardar la imagen
        String ruta = "FotosUsuarios/" + gmail + "/";
        File uploadDirFile = new File(ruta);
    
        // Borra el contenido de la carpeta si existe
        if (uploadDirFile.exists()) {
            File[] filesInDir = uploadDirFile.listFiles();
            if (filesInDir != null) {
                for (File file : filesInDir) {
                    file.delete(); // Elimina los archivos
                }
            }
            uploadDirFile.delete(); // Elimina la carpeta
        }
    
        // Crea una nueva carpeta
        uploadDirFile.mkdirs();
    
        Path uploadDir = Paths.get(ruta);
        try {
            Files.createDirectories(uploadDir);
    
            // Supone que solo sube una imagen a la vez, pero se puede ajustar para múltiples archivos
            MultipartFile file = files.get(0);
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            Path filePath = uploadDir.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    
            // Actualiza la entidad del cliente con la imagen
            clienteEntity.setImagen(fileName); // Guarda solo el nombre de la imagen
            clienteRepository.save(clienteEntity);
    
            return true;
        } catch (IOException e) {
            e.printStackTrace(); // Imprime la excepción para depuración
            return false;
        }
    }

    public boolean subidaImagenes(List<MultipartFile> files, Long idCasa) {
        ArrayList<ImagenDTO> listaImagenesSubidas = new ArrayList<ImagenDTO>();

        CasaEntity casaEntity = casaRepository.findById(idCasa).get();

        /* Subida de archivos */

        String ruta = "FotosCasas/" + idCasa + "/";

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

package com.rusticasaback.rusticasaback.Request;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubidaImagenesRequest {
    private List<MultipartFile> files;
    private String gmail;
}

package com.rusticasaback.rusticasaback.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration

public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(@SuppressWarnings("null") ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/FotosCasas/**")
                .addResourceLocations("file:FotosCasas/");

        registry.addResourceHandler("/FotosUsuarios/**")
                .addResourceLocations("file:FotosUsuarios/");

        registry.addResourceHandler("/LogoPagina/**")
                .addResourceLocations("file:LogoPagina/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Permitir todas las rutas
                .allowedOrigins("http://localhost:4200") // Permitir solo tu frontend Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*") // Todos los encabezados permitidos
                .allowCredentials(true); // Si necesitas manejar cookies o sesiones
    }
}

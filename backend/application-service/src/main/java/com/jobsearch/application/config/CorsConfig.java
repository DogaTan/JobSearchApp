package com.jobsearch.application.config;  

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Tüm endpointlere uygulanacak
                .allowedOrigins("http://localhost:3000")  // Frontend adresi
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // İzin verilen metodlar
                .allowedHeaders("*")  // Tüm header’lara izin ver
                .allowCredentials(true);  // Cookie, Authorization header gibi yetkilendirme izinleri
    }
}

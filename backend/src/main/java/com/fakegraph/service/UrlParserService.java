package com.fakegraph.service;

import org.springframework.stereotype.Service;
import java.net.URI;
import java.net.URISyntaxException;

@Service
public class UrlParserService {

    /**
     * Extrae el dominio principal de una URL completa.
     * Ejemplo: "https://www.reuters.com/article/123" -> "reuters.com"
     */
    public String extractDomain(String urlString) {
        try {
            URI uri = new URI(urlString);
            String domain = uri.getHost();
            if (domain != null) {
                return domain.startsWith("www.") ? domain.substring(4) : domain;
            }
        } catch (URISyntaxException e) {
            // Ignoramos error de parsing y devolvemos la misma url como fallback
        }
        return urlString;
    }
}

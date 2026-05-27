package com.fakegraph.DTO.response;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class NoticiaResponseDTO {
    private Long id;
    private String titulo;
    private String url;
    private String autorNombre;    // texto libre, puede ser null
    private String dominio;        // "reuters.com"
    private String nombreFuente;   // "Reuters"
    private boolean fuenteVerificada;
    private String tema;
    private ZonedDateTime fechaPublicacion;
    private Double scoreCredibilidad;
    private int totalVotos;
    private int votosVerdadero;
    private int votosFalso;
    private int votosDudoso;
    private int totalReposteos;
    private boolean yaExistia;     // true si la noticia fue deduplicada
}

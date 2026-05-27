package com.fakegraph.DTO.response;

import lombok.Data;

@Data
public class FuenteResponseDTO {
    private Long id;
    private String nombre;
    private String dominio;
    private boolean verificada;
    private Double scoreCredibilidad;
}

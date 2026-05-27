package com.fakegraph.DTO.requests;

import lombok.Data;

@Data
public class NoticiaRequestDTO {
    private String titulo;
    private String url;
    private String tema; // Nombre del tema (viene de un dropdown)
    private String autorNombre; // Opcional — nombre del redactor del artículo (texto libre)
}

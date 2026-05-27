package com.fakegraph.DTO.requests;

import lombok.Data;

@Data
public class NoticiaRequestDTO {
    private String titulo;
    private String resumen;
    private String url;
    private String autor_id;
    private String fuente_id;
    private String tema_id;
}

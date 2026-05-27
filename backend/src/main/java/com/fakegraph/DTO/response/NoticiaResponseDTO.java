package com.fakegraph.DTO.response;

import com.fakegraph.model.nodos.Autor;
import com.fakegraph.model.nodos.Fuente;
import com.fakegraph.model.nodos.Tema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NoticiaResponseDTO {
    private Long id;
    private String titulo;
    private String resumen;
    private String url;
    private LocalDateTime fechaPublicacion;
    private Double scoreCredibilidad;
    private Autor autor;
    private Fuente fuente;
    private Tema tema;
    private Fuente sitioWeb;
}

package com.fakegraph.DTO.requests;

import lombok.Data;

@Data
public class AutorResponseDTO {
    private Long id;
    private String nombre;
    private String biografia;
    private double scoreCredibilidad;
}

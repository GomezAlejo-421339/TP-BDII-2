package com.fakegraph.DTO.response;

import lombok.Data;

@Data
public class FuenteStatsDTO {
    private String nombre;
    private long cantidadNoticias;
    private Double credibilidadPromedio;
}

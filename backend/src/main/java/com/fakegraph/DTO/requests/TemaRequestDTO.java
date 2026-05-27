package com.fakegraph.DTO.requests;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Id;

@Data
public class TemaRequestDTO {
    private String nombre;
}

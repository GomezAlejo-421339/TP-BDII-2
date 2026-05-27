package com.fakegraph.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.time.LocalDateTime;

@Node
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MetricaConsulta {

    @Id
    private String id;
    private String endpoint;
    private String metodo;
    private LocalDateTime timestamp;
    private Long duracionMs;
    private int statusCode;
    private String entidad;
}

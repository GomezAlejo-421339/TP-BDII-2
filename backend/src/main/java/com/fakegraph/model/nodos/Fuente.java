package com.fakegraph.model.nodos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Fuente {
    @Id @GeneratedValue
    private Long id;
    private String nombreDominio;
    private String urlPrincipal;
    private Double scoreCredibilidad;
}

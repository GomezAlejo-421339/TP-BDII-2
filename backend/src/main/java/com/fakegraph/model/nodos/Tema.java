package com.fakegraph.model.nodos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;

@Node
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Tema {
    @Id @GeneratedValue
    private Long id;
    @Property("nombre") // <-- Esto fuerza a Spring a mapearlo con la propiedad del grafo
    private String nombre;
}

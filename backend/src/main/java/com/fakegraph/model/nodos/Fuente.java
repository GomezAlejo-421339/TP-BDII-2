package com.fakegraph.model.nodos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

/**
 * Nodo Fuente en el grafo Neo4j.
 * Representa el sitio web de origen de una noticia.
 *
 * El dominio (ej: "reuters.com") se extrae automáticamente de la URL
 * al crear una noticia y sirve como clave de MERGE para evitar duplicados.
 *
 * Constraint: CREATE CONSTRAINT fuente_dominio ... REQUIRE f.dominio IS UNIQUE
 */
@Node("Fuente")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Fuente {

    @Id
    @GeneratedValue
    private Long id;

    /**
     * Nombre legible del sitio (ej: "Reuters", "La Nación").
     * Se inicializa con el dominio hasta que un admin lo actualice.
     */
    private String nombre;

    /**
     * Dominio del sitio web (ej: "reuters.com").
     * Es la clave única de MERGE — no puede haber dos Fuentes con el mismo dominio.
     */
    private String dominio;

    /**
     * Indica si la fuente fue validada manualmente por un administrador.
     * Las fuentes verificadas aumentan el score de credibilidad de sus noticias.
     */
    private boolean verificada;

    /**
     * Score histórico de credibilidad de la fuente (0.0 a 1.0).
     * Calculado en base al promedio de scores de sus noticias.
     */
    private Double scoreCredibilidad;
}

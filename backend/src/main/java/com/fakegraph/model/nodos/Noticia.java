package com.fakegraph.model.nodos;

import com.fakegraph.model.relaciones.Comparte;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Nodo Noticia en el grafo Neo4j.
 *
 * Relaciones outgoing:
 *   - [:PUBLICADA_EN]  → Fuente   (sitio web de origen, derivado del dominio de la URL)
 *   - [:PERTENECE_A]   → Tema     (categoría de la noticia)
 *
 * Relaciones incoming (navegadas desde Usuario):
 *   - [:POSTEO]        Usuario → Noticia  (quién cargó la noticia en la plataforma)
 *   - [:COMPARTE]      Usuario → Noticia  (quién la reposteó)
 *   - [:VOTO]          Usuario → Noticia  (quién la votó)
 *
 * Deduplicación: la URL es la clave única de MERGE en Neo4j.
 * Constraint: CREATE CONSTRAINT noticia_url ... REQUIRE n.url IS UNIQUE
 */
@Node("Noticia")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Noticia {

    @Id
    @GeneratedValue
    private Long id;

    /** Título de la noticia tal como lo ingresó el usuario. */
    private String titulo;

    /**
     * URL completa de la noticia. Es la clave de deduplicación:
     * si ya existe una noticia con esta URL, se retorna la existente.
     */
    private String url;

    /**
     * Nombre del redactor del artículo original (texto libre, opcional).
     * No es un nodo separado — se guarda directamente en la noticia.
     */
    private String autorNombre;

    /** Fecha en que fue publicada la noticia en el sitio de origen. */
    private ZonedDateTime fechaPublicacion;

    /**
     * Score de credibilidad calculado en tiempo real a partir de los votos.
     * Rango: 0.0 (completamente falsa) a 1.0 (completamente verdadera).
     * Valor inicial: 0.5 (neutral, sin votos).
     */
    private Double scoreCredibilidad;

    /** Sitio web de origen. El dominio se extrae automáticamente de la URL. */
    @Relationship(type = "PUBLICADA_EN", direction = Relationship.Direction.OUTGOING)
    private Fuente sitioWeb;

    /** Categoría de la noticia. */
    @Relationship(type = "PERTENECE_A", direction = Relationship.Direction.OUTGOING)
    private Tema tema;

}

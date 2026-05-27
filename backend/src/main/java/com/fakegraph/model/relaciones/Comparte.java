package com.fakegraph.model.relaciones;

import com.fakegraph.model.nodos.Noticia;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.RelationshipId;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import java.time.ZonedDateTime;

/**
 * Relación [:COMPARTE] entre Usuario y Noticia.
 *
 * (Usuario)-[:COMPARTE {timestamp, plataforma}]->(Noticia)
 *
 * Representa el reposteo de una noticia por parte de un usuario.
 * Esta relación es clave para las consultas de difusión/propagación:
 *   MATCH path = (:Usuario)-[:POSTEO]->(:Noticia)<-[:COMPARTE*1..5]-(:Usuario)
 *
 * Nota técnica SDN 6: @RelationshipId es obligatorio en @RelationshipProperties.
 */
@RelationshipProperties
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Comparte {

    @RelationshipId
    private Long id;

    @TargetNode
    private Noticia noticia;

    /** Fecha y hora del reposteo. */
    private ZonedDateTime timestamp;

    /**
     * Plataforma desde la que se reposteó.
     * Por defecto "web" (desde la aplicación).
     * Extensible a "twitter", "facebook", etc. en el futuro.
     */
    private String plataforma;
}

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
 * Relación [:VOTO] entre Usuario y Noticia.
 *
 * (Usuario)-[:VOTO {tipoVoto, comentario, fecha}]->(Noticia)
 *
 * Un usuario puede tener como máximo UN voto por noticia.
 * El tipo de voto determina cómo afecta al scoreCredibilidad de la noticia:
 *   - VERDADERO → suma al score positivo
 *   - FALSO     → suma al score negativo
 *   - DUDOSO    → voto neutro (no afecta el ratio, pero cuenta para totalVotos)
 *
 * Nota técnica SDN 6: @RelationshipId es obligatorio en @RelationshipProperties.
 */
@RelationshipProperties
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Voto {

    @RelationshipId
    private Long id;

    @TargetNode
    private Noticia noticia;

    /** Tipo de voto emitido por el usuario. */
    private TipoVoto tipoVoto;

    /** Comentario opcional del usuario al emitir el voto. */
    private String comentario;

    /** Fecha y hora en que se emitió el voto. */
    private ZonedDateTime fecha;
}

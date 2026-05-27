package com.fakegraph.model.relaciones;

import com.fakegraph.model.nodos.Noticia;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.*;

import java.time.LocalDateTime;

@RelationshipProperties
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Comparte {
    @RelationshipId
    private Long id;
    private LocalDateTime timestamp;
    private String plataforma;

    @TargetNode
    private Noticia noticia;
}

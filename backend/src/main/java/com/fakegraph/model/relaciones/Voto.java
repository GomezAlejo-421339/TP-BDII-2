package com.fakegraph.model.relaciones;

import com.fakegraph.model.nodos.Noticia;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;

import java.time.LocalDateTime;

@RelationshipProperties
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Voto {

    @Id @GeneratedValue
    private String id;

    @TargetNode
    private Noticia noticia;

    private TipoVoto tipoVoto; // Ejemplo: "VERDADERO", "FALSO", "DUDOSO"
    private String comentario;
    private LocalDateTime fecha;
}

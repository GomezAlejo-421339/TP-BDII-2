package com.fakegraph.model.nodos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.LocalDateTime;

@Node("Noticia")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Noticia {
    @Id @GeneratedValue
    private Long id;
    private String titulo;
    private String resumen;
    private String url;
    private LocalDateTime fechaPublicacion;
    private Double scoreCredibilidad;

    @Relationship(type = "ESCRITA_POR", direction = Relationship.Direction.OUTGOING)
    private Autor autor;

    // Una noticia PERTENECE_A un Sitio Web de noticias
    @Relationship(type = "PUBLICADA_EN", direction = Relationship.Direction.OUTGOING)
    private Fuente sitioWeb;

    @Relationship(type = "TEMA", direction = Relationship.Direction.OUTGOING)
    private Tema tema;
}

package com.fakegraph.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.List;

@Node
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Claim {
    @Id
    private String id;

    private String texto;

    private String hash;

    @Relationship(type = "AFIRMA", direction = Relationship.Direction.INCOMING)
    @JsonIgnoreProperties({"claim", "desmiente", "fuente", "tema", "autor", "citas"})
    private List<Noticia> noticias;

    @Relationship(type = "DESMIENTE", direction = Relationship.Direction.INCOMING)
    @JsonIgnoreProperties({"claim", "desmiente", "fuente", "tema", "autor", "citas"})
    private List<Noticia> desmentidos;
}

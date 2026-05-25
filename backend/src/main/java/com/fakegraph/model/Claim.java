package com.fakegraph.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.List;

@Node
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

    public Claim() {}

    public Claim(String id, String texto, String hash) {
        this.id = id;
        this.texto = texto;
        this.hash = hash;
        this.noticias = new ArrayList<>();
        this.desmentidos = new ArrayList<>();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }

    public String getHash() { return hash; }
    public void setHash(String hash) { this.hash = hash; }

    public List<Noticia> getNoticias() { return noticias; }
    public void setNoticias(List<Noticia> noticias) { this.noticias = noticias; }

    public List<Noticia> getDesmentidos() { return desmentidos; }
    public void setDesmentidos(List<Noticia> desmentidos) { this.desmentidos = desmentidos; }
}

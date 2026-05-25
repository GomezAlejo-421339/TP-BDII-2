package com.fakegraph.model;

import org.springframework.data.neo4j.core.schema.*;

import java.time.LocalDateTime;

@RelationshipProperties
public class Comparte {
    @RelationshipId
    private Long id;

    private LocalDateTime timestamp;

    private String plataforma;

    @TargetNode
    private Noticia noticia;

    public Comparte() {}

    public Comparte(LocalDateTime timestamp, String plataforma, Noticia noticia) {
        this.timestamp = timestamp;
        this.plataforma = plataforma;
        this.noticia = noticia;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getPlataforma() { return plataforma; }
    public void setPlataforma(String plataforma) { this.plataforma = plataforma; }

    public Noticia getNoticia() { return noticia; }
    public void setNoticia(Noticia noticia) { this.noticia = noticia; }
}

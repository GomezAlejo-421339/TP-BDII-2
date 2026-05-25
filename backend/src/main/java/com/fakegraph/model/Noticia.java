package com.fakegraph.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Node
public class Noticia {
    @Id
    private String id;

    private String titulo;

    private String contenido;

    private String hashContenido;

    private String url;

    private LocalDateTime fechaPublicacion;

    private Double scoreCredibilidad;

    @Relationship(type = "PROVIENE_DE", direction = Relationship.Direction.OUTGOING)
    @JsonIgnoreProperties({"noticias", "desmentidos"})
    private Fuente fuente;

    @Relationship(type = "PERTENECE_A", direction = Relationship.Direction.OUTGOING)
    private Tema tema;

    @Relationship(type = "PUBLICA", direction = Relationship.Direction.INCOMING)
    private Autor autor;

    @Relationship(type = "CITA", direction = Relationship.Direction.OUTGOING)
    @JsonIgnoreProperties({"citas", "fuente", "tema", "autor", "claim", "desmiente"})
    private List<Noticia> citas;

    @Relationship(type = "AFIRMA", direction = Relationship.Direction.OUTGOING)
    @JsonIgnoreProperties({"noticias", "desmentidos"})
    private Claim claim;

    @Relationship(type = "DESMIENTE", direction = Relationship.Direction.OUTGOING)
    @JsonIgnoreProperties({"noticias", "desmentidos"})
    private List<Claim> desmiente;

    public Noticia() {}

    public Noticia(String id, String titulo, String contenido, String hashContenido,
                   String url, LocalDateTime fechaPublicacion) {
        this.id = id;
        this.titulo = titulo;
        this.contenido = contenido;
        this.hashContenido = hashContenido;
        this.url = url;
        this.fechaPublicacion = fechaPublicacion;
        this.scoreCredibilidad = 0.5;
        this.citas = new ArrayList<>();
        this.desmiente = new ArrayList<>();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }

    public String getHashContenido() { return hashContenido; }
    public void setHashContenido(String hashContenido) { this.hashContenido = hashContenido; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public LocalDateTime getFechaPublicacion() { return fechaPublicacion; }
    public void setFechaPublicacion(LocalDateTime fechaPublicacion) { this.fechaPublicacion = fechaPublicacion; }

    public Double getScoreCredibilidad() { return scoreCredibilidad; }
    public void setScoreCredibilidad(Double scoreCredibilidad) { this.scoreCredibilidad = scoreCredibilidad; }

    public Fuente getFuente() { return fuente; }
    public void setFuente(Fuente fuente) { this.fuente = fuente; }

    public Tema getTema() { return tema; }
    public void setTema(Tema tema) { this.tema = tema; }

    public Autor getAutor() { return autor; }
    public void setAutor(Autor autor) { this.autor = autor; }

    public List<Noticia> getCitas() { return citas; }
    public void setCitas(List<Noticia> citas) { this.citas = citas; }

    public Claim getClaim() { return claim; }
    public void setClaim(Claim claim) { this.claim = claim; }

    public List<Claim> getDesmiente() { return desmiente; }
    public void setDesmiente(List<Claim> desmiente) { this.desmiente = desmiente; }
}

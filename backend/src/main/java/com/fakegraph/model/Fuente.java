package com.fakegraph.model;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
public class Fuente {
    @Id
    private String id;

    private String nombre;

    private String dominio;

    private boolean verificada;

    private Double puntajeHistorial;

    public Fuente() {}

    public Fuente(String id, String nombre, String dominio, boolean verificada) {
        this.id = id;
        this.nombre = nombre;
        this.dominio = dominio;
        this.verificada = verificada;
        this.puntajeHistorial = 0.5;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDominio() { return dominio; }
    public void setDominio(String dominio) { this.dominio = dominio; }

    public boolean isVerificada() { return verificada; }
    public void setVerificada(boolean verificada) { this.verificada = verificada; }

    public Double getPuntajeHistorial() { return puntajeHistorial; }
    public void setPuntajeHistorial(Double puntajeHistorial) { this.puntajeHistorial = puntajeHistorial; }
}

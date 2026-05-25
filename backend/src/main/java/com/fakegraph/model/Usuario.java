package com.fakegraph.model;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
public class Usuario {
    @Id
    private String id;

    private String nombre;

    private int seguidores;

    private int antiguedadDias;

    public Usuario() {}

    public Usuario(String id, String nombre, int seguidores, int antiguedadDias) {
        this.id = id;
        this.nombre = nombre;
        this.seguidores = seguidores;
        this.antiguedadDias = antiguedadDias;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public int getSeguidores() { return seguidores; }
    public void setSeguidores(int seguidores) { this.seguidores = seguidores; }

    public int getAntiguedadDias() { return antiguedadDias; }
    public void setAntiguedadDias(int antiguedadDias) { this.antiguedadDias = antiguedadDias; }
}

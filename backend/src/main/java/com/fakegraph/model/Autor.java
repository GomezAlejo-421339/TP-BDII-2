package com.fakegraph.model;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
public class Autor {
    @Id
    private String id;

    private String nombre;

    private String handle;

    public Autor() {}

    public Autor(String id, String nombre, String handle) {
        this.id = id;
        this.nombre = nombre;
        this.handle = handle;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getHandle() { return handle; }
    public void setHandle(String handle) { this.handle = handle; }
}

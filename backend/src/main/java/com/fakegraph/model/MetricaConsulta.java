package com.fakegraph.model;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.time.LocalDateTime;

@Node
public class MetricaConsulta {

    @Id
    private String id;

    private String endpoint;

    private String metodo;

    private LocalDateTime timestamp;

    private Long duracionMs;

    private int statusCode;

    private String entidad;

    public MetricaConsulta() {}

    public MetricaConsulta(String id, String endpoint, String metodo,
                           LocalDateTime timestamp, Long duracionMs,
                           int statusCode, String entidad) {
        this.id = id;
        this.endpoint = endpoint;
        this.metodo = metodo;
        this.timestamp = timestamp;
        this.duracionMs = duracionMs;
        this.statusCode = statusCode;
        this.entidad = entidad;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEndpoint() { return endpoint; }
    public void setEndpoint(String endpoint) { this.endpoint = endpoint; }

    public String getMetodo() { return metodo; }
    public void setMetodo(String metodo) { this.metodo = metodo; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public Long getDuracionMs() { return duracionMs; }
    public void setDuracionMs(Long duracionMs) { this.duracionMs = duracionMs; }

    public int getStatusCode() { return statusCode; }
    public void setStatusCode(int statusCode) { this.statusCode = statusCode; }

    public String getEntidad() { return entidad; }
    public void setEntidad(String entidad) { this.entidad = entidad; }
}

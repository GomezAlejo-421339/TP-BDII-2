package com.fakegraph.repository;

import org.springframework.data.annotation.Id;

public class EndpointStats {

    @Id
    private String endpoint;
    private String metodo;
    private Long total;
    private Double duracionPromedio;
    private Long duracionMaxima;

    public EndpointStats() {}

    public String getEndpoint() { return endpoint; }
    public void setEndpoint(String endpoint) { this.endpoint = endpoint; }

    public String getMetodo() { return metodo; }
    public void setMetodo(String metodo) { this.metodo = metodo; }

    public Long getTotal() { return total; }
    public void setTotal(Long total) { this.total = total; }

    public Double getDuracionPromedio() { return duracionPromedio; }
    public void setDuracionPromedio(Double duracionPromedio) { this.duracionPromedio = duracionPromedio; }

    public Long getDuracionMaxima() { return duracionMaxima; }
    public void setDuracionMaxima(Long duracionMaxima) { this.duracionMaxima = duracionMaxima; }
}

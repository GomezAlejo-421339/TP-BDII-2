package com.fakegraph.repository;

import org.springframework.data.annotation.Id;

public class ResumenStats {

    @Id
    private Long totalConsultas;
    private Double duracionPromedio;
    private Long endpointsUnicos;
    private Double tasaError;

    public ResumenStats() {}

    public Long getTotalConsultas() { return totalConsultas; }
    public void setTotalConsultas(Long totalConsultas) { this.totalConsultas = totalConsultas; }

    public Double getDuracionPromedio() { return duracionPromedio; }
    public void setDuracionPromedio(Double duracionPromedio) { this.duracionPromedio = duracionPromedio; }

    public Long getEndpointsUnicos() { return endpointsUnicos; }
    public void setEndpointsUnicos(Long endpointsUnicos) { this.endpointsUnicos = endpointsUnicos; }

    public Double getTasaError() { return tasaError; }
    public void setTasaError(Double tasaError) { this.tasaError = tasaError; }
}

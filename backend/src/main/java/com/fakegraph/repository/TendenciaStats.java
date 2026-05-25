package com.fakegraph.repository;

public class TendenciaStats {
    private String fecha;
    private Long total;
    private Double credibilidadPromedio;

    public TendenciaStats() {}

    public TendenciaStats(String fecha, Long total, Double credibilidadPromedio) {
        this.fecha = fecha;
        this.total = total;
        this.credibilidadPromedio = credibilidadPromedio;
    }

    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }

    public Long getTotal() { return total; }
    public void setTotal(Long total) { this.total = total; }

    public Double getCredibilidadPromedio() { return credibilidadPromedio; }
    public void setCredibilidadPromedio(Double credibilidadPromedio) { this.credibilidadPromedio = credibilidadPromedio; }
}

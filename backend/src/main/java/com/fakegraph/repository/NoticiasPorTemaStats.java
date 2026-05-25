package com.fakegraph.repository;

public class NoticiasPorTemaStats {
    private String tema;
    private Long total;
    private Double credibilidadPromedio;

    public NoticiasPorTemaStats() {}

    public NoticiasPorTemaStats(String tema, Long total, Double credibilidadPromedio) {
        this.tema = tema;
        this.total = total;
        this.credibilidadPromedio = credibilidadPromedio;
    }

    public String getTema() { return tema; }
    public void setTema(String tema) { this.tema = tema; }

    public Long getTotal() { return total; }
    public void setTotal(Long total) { this.total = total; }

    public Double getCredibilidadPromedio() { return credibilidadPromedio; }
    public void setCredibilidadPromedio(Double credibilidadPromedio) { this.credibilidadPromedio = credibilidadPromedio; }
}

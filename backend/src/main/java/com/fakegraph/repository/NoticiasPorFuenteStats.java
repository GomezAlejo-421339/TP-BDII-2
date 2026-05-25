package com.fakegraph.repository;

public class NoticiasPorFuenteStats {
    private String fuente;
    private Boolean verificada;
    private Long total;
    private Double credibilidadPromedio;

    public NoticiasPorFuenteStats() {}

    public NoticiasPorFuenteStats(String fuente, Boolean verificada, Long total, Double credibilidadPromedio) {
        this.fuente = fuente;
        this.verificada = verificada;
        this.total = total;
        this.credibilidadPromedio = credibilidadPromedio;
    }

    public String getFuente() { return fuente; }
    public void setFuente(String fuente) { this.fuente = fuente; }

    public Boolean getVerificada() { return verificada; }
    public void setVerificada(Boolean verificada) { this.verificada = verificada; }

    public Long getTotal() { return total; }
    public void setTotal(Long total) { this.total = total; }

    public Double getCredibilidadPromedio() { return credibilidadPromedio; }
    public void setCredibilidadPromedio(Double credibilidadPromedio) { this.credibilidadPromedio = credibilidadPromedio; }
}

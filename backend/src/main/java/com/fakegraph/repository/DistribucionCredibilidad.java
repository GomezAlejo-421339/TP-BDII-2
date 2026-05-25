package com.fakegraph.repository;

public class DistribucionCredibilidad {
    private String rango;
    private Long cantidad;
    private Double porcentaje;

    public DistribucionCredibilidad() {}

    public DistribucionCredibilidad(String rango, Long cantidad, Double porcentaje) {
        this.rango = rango;
        this.cantidad = cantidad;
        this.porcentaje = porcentaje;
    }

    public String getRango() { return rango; }
    public void setRango(String rango) { this.rango = rango; }

    public Long getCantidad() { return cantidad; }
    public void setCantidad(Long cantidad) { this.cantidad = cantidad; }

    public Double getPorcentaje() { return porcentaje; }
    public void setPorcentaje(Double porcentaje) { this.porcentaje = porcentaje; }
}

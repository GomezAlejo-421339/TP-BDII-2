package com.fakegraph.repository;

public class TopUsuarioStats {
    private String nombre;
    private Long totalShares;
    private Integer seguidores;

    public TopUsuarioStats() {}

    public TopUsuarioStats(String nombre, Long totalShares, Integer seguidores) {
        this.nombre = nombre;
        this.totalShares = totalShares;
        this.seguidores = seguidores;
    }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public Long getTotalShares() { return totalShares; }
    public void setTotalShares(Long totalShares) { this.totalShares = totalShares; }

    public Integer getSeguidores() { return seguidores; }
    public void setSeguidores(Integer seguidores) { this.seguidores = seguidores; }
}

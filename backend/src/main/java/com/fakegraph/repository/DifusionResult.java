package com.fakegraph.repository;

import org.springframework.data.annotation.Id;

import java.util.List;

public class DifusionResult {
    @Id
    private String titulo;
    private List<String> usuarios;
    private long totalShares;

    public DifusionResult() {}

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public List<String> getUsuarios() { return usuarios; }
    public void setUsuarios(List<String> usuarios) { this.usuarios = usuarios; }

    public long getTotalShares() { return totalShares; }
    public void setTotalShares(long totalShares) { this.totalShares = totalShares; }
}

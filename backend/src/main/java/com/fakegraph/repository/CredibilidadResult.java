package com.fakegraph.repository;

import org.springframework.data.annotation.Id;

public class CredibilidadResult {
    @Id
    private String noticiaId;
    private String titulo;
    private String fuente;
    private boolean fuenteVerificada;
    private long shares;
    private long desmentidos;
    private double scoreCredibilidad;

    public CredibilidadResult() {}

    public String getNoticiaId() { return noticiaId; }
    public void setNoticiaId(String noticiaId) { this.noticiaId = noticiaId; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getFuente() { return fuente; }
    public void setFuente(String fuente) { this.fuente = fuente; }

    public boolean isFuenteVerificada() { return fuenteVerificada; }
    public void setFuenteVerificada(boolean fuenteVerificada) { this.fuenteVerificada = fuenteVerificada; }

    public long getShares() { return shares; }
    public void setShares(long shares) { this.shares = shares; }

    public long getDesmentidos() { return desmentidos; }
    public void setDesmentidos(long desmentidos) { this.desmentidos = desmentidos; }

    public double getScoreCredibilidad() { return scoreCredibilidad; }
    public void setScoreCredibilidad(double scoreCredibilidad) { this.scoreCredibilidad = scoreCredibilidad; }
}

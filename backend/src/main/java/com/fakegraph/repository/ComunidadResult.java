package com.fakegraph.repository;

import org.springframework.data.annotation.Id;

import java.util.List;

public class ComunidadResult {
    @Id
    private Long communityId;
    private List<String> miembros;
    private long tamano;

    public ComunidadResult() {}

    public Long getCommunityId() { return communityId; }
    public void setCommunityId(Long communityId) { this.communityId = communityId; }

    public List<String> getMiembros() { return miembros; }
    public void setMiembros(List<String> miembros) { this.miembros = miembros; }

    public long getTamano() { return tamano; }
    public void setTamano(long tamano) { this.tamano = tamano; }
}

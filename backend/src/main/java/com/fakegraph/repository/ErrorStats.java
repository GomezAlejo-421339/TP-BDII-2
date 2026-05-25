package com.fakegraph.repository;

import org.springframework.data.annotation.Id;

import java.util.List;

public class ErrorStats {

    @Id
    private String endpoint;
    private String metodo;
    private Long totalErrores;
    private List<Integer> codigos;

    public ErrorStats() {}

    public String getEndpoint() { return endpoint; }
    public void setEndpoint(String endpoint) { this.endpoint = endpoint; }

    public String getMetodo() { return metodo; }
    public void setMetodo(String metodo) { this.metodo = metodo; }

    public Long getTotalErrores() { return totalErrores; }
    public void setTotalErrores(Long totalErrores) { this.totalErrores = totalErrores; }

    public List<Integer> getCodigos() { return codigos; }
    public void setCodigos(List<Integer> codigos) { this.codigos = codigos; }
}

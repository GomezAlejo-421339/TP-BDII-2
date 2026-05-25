package com.fakegraph.repository;

import org.springframework.data.annotation.Id;

public class HistorialStats {

    @Id
    private String hora;
    private Long total;

    public HistorialStats() {}

    public String getHora() { return hora; }
    public void setHora(String hora) { this.hora = hora; }

    public Long getTotal() { return total; }
    public void setTotal(Long total) { this.total = total; }
}

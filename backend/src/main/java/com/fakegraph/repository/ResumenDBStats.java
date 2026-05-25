package com.fakegraph.repository;

public class ResumenDBStats {
    private Long totalNoticias;
    private Double credibilidadPromedio;
    private Long totalFuentes;
    private Long totalFuentesVerificadas;
    private Long totalClaims;
    private Long totalUsuarios;

    public ResumenDBStats() {}

    public ResumenDBStats(Long totalNoticias, Double credibilidadPromedio, Long totalFuentes,
                          Long totalFuentesVerificadas, Long totalClaims, Long totalUsuarios) {
        this.totalNoticias = totalNoticias;
        this.credibilidadPromedio = credibilidadPromedio;
        this.totalFuentes = totalFuentes;
        this.totalFuentesVerificadas = totalFuentesVerificadas;
        this.totalClaims = totalClaims;
        this.totalUsuarios = totalUsuarios;
    }

    public Long getTotalNoticias() { return totalNoticias; }
    public void setTotalNoticias(Long totalNoticias) { this.totalNoticias = totalNoticias; }

    public Double getCredibilidadPromedio() { return credibilidadPromedio; }
    public void setCredibilidadPromedio(Double credibilidadPromedio) { this.credibilidadPromedio = credibilidadPromedio; }

    public Long getTotalFuentes() { return totalFuentes; }
    public void setTotalFuentes(Long totalFuentes) { this.totalFuentes = totalFuentes; }

    public Long getTotalFuentesVerificadas() { return totalFuentesVerificadas; }
    public void setTotalFuentesVerificadas(Long totalFuentesVerificadas) { this.totalFuentesVerificadas = totalFuentesVerificadas; }

    public Long getTotalClaims() { return totalClaims; }
    public void setTotalClaims(Long totalClaims) { this.totalClaims = totalClaims; }

    public Long getTotalUsuarios() { return totalUsuarios; }
    public void setTotalUsuarios(Long totalUsuarios) { this.totalUsuarios = totalUsuarios; }
}

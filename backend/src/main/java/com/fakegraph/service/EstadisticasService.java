package com.fakegraph.service;

import com.fakegraph.model.MetricaConsulta;
import com.fakegraph.repository.*;
import org.neo4j.driver.Driver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EstadisticasService {

    private final MetricaConsultaRepository metricaRepository;
    private final Driver driver;

    public EstadisticasService(MetricaConsultaRepository metricaRepository, Driver driver) {
        this.metricaRepository = metricaRepository;
        this.driver = driver;
    }

    @Transactional
    public void registrar(MetricaConsulta metrica) {
        metricaRepository.save(metrica);
    }

    @Transactional(readOnly = true)
    public ResumenStats obtenerResumen() {
        return metricaRepository.findResumen();
    }

    @Transactional(readOnly = true)
    public List<EndpointStats> obtenerRankingEndpoints() {
        return metricaRepository.findEndpointRanking();
    }

    @Transactional(readOnly = true)
    public List<ErrorStats> obtenerErrores() {
        return metricaRepository.findErrores();
    }

    @Transactional(readOnly = true)
    public List<HistorialStats> obtenerHistorial(int horas) {
        LocalDateTime desde = LocalDateTime.now().minusHours(horas);
        return metricaRepository.findHistorial(desde);
    }

    public ResumenDBStats obtenerResumenDB() {
        var query = """
            MATCH (n:Noticia)
            WITH COUNT(n) AS totalNoticias, COALESCE(AVG(n.scoreCredibilidad), 0.0) AS credibilidadPromedio
            MATCH (f:Fuente)
            WITH totalNoticias, credibilidadPromedio, COUNT(f) AS totalFuentes
            MATCH (fv:Fuente) WHERE fv.verificada = true
            WITH totalNoticias, credibilidadPromedio, totalFuentes, COUNT(fv) AS totalFuentesVerificadas
            MATCH (c:Claim)
            WITH totalNoticias, credibilidadPromedio, totalFuentes, totalFuentesVerificadas, COUNT(c) AS totalClaims
            MATCH (u:Usuario)
            RETURN totalNoticias, credibilidadPromedio, totalFuentes, totalFuentesVerificadas, totalClaims, COUNT(u) AS totalUsuarios
            """;
        try (var session = driver.session()) {
            var results = session.run(query).list(r -> new ResumenDBStats(
                r.get("totalNoticias").asLong(),
                r.get("credibilidadPromedio").asDouble(),
                r.get("totalFuentes").asLong(),
                r.get("totalFuentesVerificadas").asLong(),
                r.get("totalClaims").asLong(),
                r.get("totalUsuarios").asLong()
            ));
            return results.isEmpty() ? new ResumenDBStats(0L, 0.0, 0L, 0L, 0L, 0L) : results.get(0);
        }
    }

    public List<DistribucionCredibilidad> obtenerDistribucion() {
        var query = """
            MATCH (n:Noticia)
            RETURN
              CASE
                WHEN n.scoreCredibilidad < 0.3 THEN 'Crítica'
                WHEN n.scoreCredibilidad < 0.6 THEN 'Dudosa'
                ELSE 'Confiable'
              END AS rango,
              COUNT(n) AS cantidad
            """;
        try (var session = driver.session()) {
            var raw = session.run(query).list(r ->
                new DistribucionCredibilidad(
                    r.get("rango").asString(),
                    r.get("cantidad").asLong(),
                    0.0
                )
            );
            long total = raw.stream().mapToLong(DistribucionCredibilidad::getCantidad).sum();
            if (total > 0) {
                raw.forEach(d -> d.setPorcentaje(Math.round(d.getCantidad() * 1000.0 / total) / 10.0));
            }
            return raw;
        }
    }

    public List<NoticiasPorFuenteStats> obtenerNoticiasPorFuente() {
        var query = """
            MATCH (n:Noticia)-[:PROVIENE_DE]->(f:Fuente)
            RETURN f.nombre AS fuente, f.verificada AS verificada,
                   COUNT(n) AS total, ROUND(AVG(n.scoreCredibilidad), 2) AS credibilidadPromedio
            ORDER BY total DESC
            """;
        try (var session = driver.session()) {
            return session.run(query).list(r -> new NoticiasPorFuenteStats(
                r.get("fuente").asString(),
                r.get("verificada").asBoolean(),
                r.get("total").asLong(),
                r.get("credibilidadPromedio").asDouble()
            ));
        }
    }

    public List<NoticiasPorTemaStats> obtenerNoticiasPorTema() {
        var query = """
            MATCH (n:Noticia)-[:PERTENECE_A]->(t:Tema)
            RETURN t.nombre AS tema, COUNT(n) AS total,
                   ROUND(AVG(n.scoreCredibilidad), 2) AS credibilidadPromedio
            ORDER BY total DESC
            """;
        try (var session = driver.session()) {
            return session.run(query).list(r -> new NoticiasPorTemaStats(
                r.get("tema").asString(),
                r.get("total").asLong(),
                r.get("credibilidadPromedio").asDouble()
            ));
        }
    }

    public List<TopUsuarioStats> obtenerTopUsuarios() {
        var query = """
            MATCH (u:Usuario)-[c:COMPARTE]->(:Noticia)
            RETURN u.nombre AS nombre, COUNT(c) AS totalShares, u.seguidores AS seguidores
            ORDER BY totalShares DESC
            LIMIT 10
            """;
        try (var session = driver.session()) {
            return session.run(query).list(r -> new TopUsuarioStats(
                r.get("nombre").asString(),
                r.get("totalShares").asLong(),
                r.get("seguidores").asInt()
            ));
        }
    }

    public List<TendenciaStats> obtenerTendencia() {
        var query = """
            MATCH (n:Noticia)
            RETURN toString(n.fechaPublicacion) AS fecha,
                   COUNT(n) AS total,
                   ROUND(AVG(n.scoreCredibilidad), 2) AS credibilidadPromedio
            ORDER BY fecha ASC
            """;
        try (var session = driver.session()) {
            return session.run(query).list(r -> new TendenciaStats(
                r.get("fecha").asString(),
                r.get("total").asLong(),
                r.get("credibilidadPromedio").asDouble()
            ));
        }
    }
}

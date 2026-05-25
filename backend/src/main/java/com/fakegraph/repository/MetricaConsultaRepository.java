package com.fakegraph.repository;

import com.fakegraph.model.MetricaConsulta;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface MetricaConsultaRepository extends Neo4jRepository<MetricaConsulta, String> {

    @Query("MATCH (m:MetricaConsulta) " +
           "RETURN COUNT(m) AS totalConsultas, " +
           "       AVG(m.duracionMs) AS duracionPromedio, " +
           "       COUNT(DISTINCT m.endpoint) AS endpointsUnicos, " +
           "       AVG(CASE WHEN m.statusCode >= 400 THEN 1.0 ELSE 0.0 END) * 100 AS tasaError")
    ResumenStats findResumen();

    @Query("MATCH (m:MetricaConsulta) " +
           "RETURN m.endpoint AS endpoint, " +
           "       m.metodo AS metodo, " +
           "       COUNT(m) AS total, " +
           "       AVG(m.duracionMs) AS duracionPromedio, " +
           "       MAX(m.duracionMs) AS duracionMaxima " +
           "ORDER BY total DESC")
    List<EndpointStats> findEndpointRanking();

    @Query("MATCH (m:MetricaConsulta) " +
           "WHERE m.statusCode >= 400 " +
           "RETURN m.endpoint AS endpoint, " +
           "       m.metodo AS metodo, " +
           "       COUNT(m) AS totalErrores, " +
           "       COLLECT(DISTINCT m.statusCode) AS codigos " +
           "ORDER BY totalErrores DESC")
    List<ErrorStats> findErrores();

    @Query("MATCH (m:MetricaConsulta) " +
           "WHERE m.timestamp >= $desde " +
           "RETURN toString(m.timestamp) AS hora, " +
           "       COUNT(m) AS total " +
           "ORDER BY hora ASC")
    List<HistorialStats> findHistorial(LocalDateTime desde);
}

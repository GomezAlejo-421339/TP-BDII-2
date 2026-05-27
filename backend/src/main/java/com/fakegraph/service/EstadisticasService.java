package com.fakegraph.service;

import com.fakegraph.model.DistribucionCredibilidad;
import com.fakegraph.repository.NoticiaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EstadisticasService {

    private final Neo4jClient neo4jClient;
    private final NoticiaRepository noticiaRepository;

    public EstadisticasService(Neo4jClient neo4jClient, NoticiaRepository noticiaRepository) {
        this.neo4jClient = neo4jClient;
        this.noticiaRepository = noticiaRepository;
    }

    public Map<String, Object> getResumen() {
        return neo4jClient.query("MATCH (n:Noticia) " +
                "OPTIONAL MATCH (f:Fuente) " +
                "OPTIONAL MATCH (fv:Fuente {verificada: true}) " +
                "OPTIONAL MATCH (u:Usuario) " +
                "RETURN count(DISTINCT n) as totalNoticias, " +
                "avg(n.scoreCredibilidad) as credibilidadPromedio, " +
                "count(DISTINCT f) as totalFuentes, " +
                "count(DISTINCT fv) as totalFuentesVerificadas, " +
                "0 as totalClaims, " +
                "count(DISTINCT u) as totalUsuarios")
                .fetch().first().orElse(Map.of());
    }

    public List<DistribucionCredibilidad> getDistribucionCredibilidad() {
//        return (List<Map<String, Object>>) neo4jClient.query(
//                "MATCH (n:Noticia) " +
//                "WITH CASE " +
//                "  WHEN n.scoreCredibilidad >= 0.6 THEN 'Confiable' " +
//                "  WHEN n.scoreCredibilidad >= 0.3 THEN 'Dudosa' " +
//                "  ELSE 'Crítica' END AS name, " +
//                "count(n) AS value " +
//                "RETURN name, value")
//                .fetch().all();
        return noticiaRepository.getDistribucionCredibilidad();
    }

    public List<Map<String, Object>> getNoticiasPorFuente() {
        return (List<Map<String, Object>>) neo4jClient.query(
                "MATCH (n:Noticia)-[:PUBLICADA_EN]->(f:Fuente) " +
                "RETURN f.nombre AS name, count(n) AS cantidad, avg(n.scoreCredibilidad) as credibilidad " +
                "ORDER BY cantidad DESC LIMIT 10")
                .fetch().all();
    }

    public List<Map<String, Object>> getNoticiasPorTema() {
        return (List<Map<String, Object>>) neo4jClient.query(
                "MATCH (n:Noticia)-[:PERTENECE_A]->(t:Tema) " +
                "RETURN t.nombre AS name, count(n) AS value " +
                "ORDER BY value DESC")
                .fetch().all();
    }

    public List<Map<String, Object>> getTopUsuariosActivos() {
        return (List<Map<String, Object>>) neo4jClient.query(
                "MATCH (u:Usuario)-[c:COMPARTE]->(n:Noticia) " +
                "RETURN u.nombre AS usuario, count(c) AS cantidadCompartida " +
                "ORDER BY cantidadCompartida DESC LIMIT 10")
                .fetch().all();
    }

    public List<Map<String, Object>> getTendenciaTemporal() {
        return (List<Map<String, Object>>) neo4jClient.query(
                "MATCH (n:Noticia) " +
                "WHERE n.fechaPublicacion IS NOT NULL " +
                "RETURN date(n.fechaPublicacion) AS fecha, count(n) as cantidad " +
                "ORDER BY fecha ASC")
                .fetch().all();
    }
    
    // Consulta de traversal (Recomendaciones Colaborativas)
    public List<Map<String, Object>> getRecomendacionesParaUsuario(Long usuarioId) {
        return (List<Map<String, Object>>) neo4jClient.query(
                "MATCH (yo:Usuario)-[:VOTO {tipoVoto: 'VERDADERO'}]->(n1:Noticia)" +
                "<-[:VOTO {tipoVoto: 'VERDADERO'}]-(otroUsuario:Usuario)" +
                "-[:VOTO {tipoVoto: 'VERDADERO'}]->(nRecomendada:Noticia) " +
                "WHERE id(yo) = $usuarioId " +
                "  AND id(yo) <> id(otroUsuario) " +
                "  AND NOT (yo)-[:VOTO]->(nRecomendada) " +
                "  AND NOT (yo)-[:POSTEO]->(nRecomendada) " +
                "WITH nRecomendada, count(DISTINCT otroUsuario) as coincidencias " +
                "RETURN nRecomendada.id AS id, nRecomendada.titulo AS titulo, " +
                "       nRecomendada.scoreCredibilidad AS score, coincidencias " +
                "ORDER BY coincidencias DESC LIMIT 5")
                .bind(usuarioId).to("usuarioId")
                .fetch().all();
    }
}

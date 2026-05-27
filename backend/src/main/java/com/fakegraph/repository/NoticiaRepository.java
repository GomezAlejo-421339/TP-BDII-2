package com.fakegraph.repository;

import com.fakegraph.model.DistribucionCredibilidad;
import com.fakegraph.model.nodos.Noticia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

public interface NoticiaRepository extends Neo4jRepository<Noticia, Long> {

    /**
     * Usa MERGE para garantizar la deduplicación por URL de forma atómica.
     * Si la noticia ya existe, no la sobreescribe (ON CREATE SET).
     */
    @Query("MERGE (n:Noticia {url: $url}) " +
           "ON CREATE SET n.titulo = $titulo, n.autorNombre = $autorNombre, " +
           "n.fechaPublicacion = $fecha, n.scoreCredibilidad = 0.5 " +
           "RETURN n")
    Noticia mergeByUrl(String url, String titulo, String autorNombre, ZonedDateTime fecha);

    /**
     * Recalcula el score de credibilidad de una noticia tras un voto.
     * Calcula: votos positivos / total votos. Si no hay votos, vuelve a 0.5.
     */
    @Query("MATCH (n:Noticia)<-[v:VOTO]-(u:Usuario) WHERE id(n) = $noticiaId " +
           "WITH n, count(v) as total, " +
           "sum(case when v.tipoVoto = 'VERDADERO' then 1 else 0 end) as positivos " +
           "SET n.scoreCredibilidad = CASE WHEN total > 0 THEN toFloat(positivos) / total ELSE 0.5 END " +
           "RETURN n")
    Noticia recalcularScore(Long noticiaId);

    /**
     * Busca noticias dudosas (score bajo) pero con alta difusión (muchos reposteos).
     * Útil para detectar fake news virales.
     */
    @Query("MATCH (n:Noticia)<-[c:COMPARTE]-(:Usuario) " +
           "WHERE n.scoreCredibilidad < 0.4 " +
           "WITH n, count(c) as reposteos " +
           "WHERE reposteos > 5 " +
           "RETURN n ORDER BY reposteos DESC LIMIT 10")
    Iterable<Noticia> findNoticiasSospechosasAltaDifusion();
    
    java.util.Optional<Noticia> findByUrl(String url);

    Page<Noticia> findByTitulo(String titulo, Pageable pageable);

    @Query("MATCH (n:Noticia) " +
            "WITH CASE " +
            "  WHEN n.scoreCredibilidad >= 0.6 THEN 'Confiable' " +
            "  WHEN n.scoreCredibilidad >= 0.3 THEN 'Dudosa' " +
            "  ELSE 'Crítica' END AS name, " +
            "count(n) AS value " +
            "RETURN name, value")
    List<DistribucionCredibilidad> getDistribucionCredibilidad();
}

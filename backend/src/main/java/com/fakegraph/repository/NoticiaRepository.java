package com.fakegraph.repository;

import com.fakegraph.model.nodos.Noticia;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

public interface NoticiaRepository extends Neo4jRepository<Noticia, Long> {

    /**
     * Consulta Cypher que calcula el porcentaje de votos "VERDADERO"
     * ponderados por la reputación del usuario que votó, para actualizar el score de la noticia.
     */
    @Query("MATCH (u:Usuario)-[r:INTERACTUO_CON]->(n:Noticia) WHERE id(n) = $idNoticia " +
            "WITH n, count(r) as totalVotos, " +
            "sum(case when r.tipoVoto = 'VERDADERO' then u.scoreCredibilidad else 0 end) as votosPositivos " +
            "SET n.scoreCredibilidad = (votosPositivos / totalVotos) * 100 " +
            "RETURN n")
    Noticia recalcularScoreCredibilidad(Long idNoticia);

}

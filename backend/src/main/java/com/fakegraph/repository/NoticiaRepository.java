package com.fakegraph.repository;

import com.fakegraph.model.Noticia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;
import java.util.Optional;

public interface NoticiaRepository extends Neo4jRepository<Noticia, String> {

    Optional<Noticia> findByHashContenido(String hashContenido);

    List<Noticia> findByFuenteVerificadaFalse();

    @Query("MATCH (n:Noticia)-[:PROVIENE_DE]->(f:Fuente) " +
           "WHERE f.verificada = false " +
           "MATCH (n)<-[:COMPARTE]-(u:Usuario) " +
           "WITH n, COUNT(u) AS shares " +
           "WHERE shares > $minShares " +
           "RETURN n ORDER BY shares DESC")
    List<Noticia> findSuspiciousByShares(int minShares);

    @Query("MATCH (n:Noticia)-[:PROVIENE_DE]->(f:Fuente) " +
           "OPTIONAL MATCH (n)<-[:COMPARTE]-(u:Usuario) " +
           "OPTIONAL MATCH (c:Claim)<-[:AFIRMA]-(n) " +
           "OPTIONAL MATCH (c)<-[:DESMIENTE]-(d:Noticia)-[:PROVIENE_DE]->(df:Fuente) " +
           "WHERE df.verificada = true " +
           "WITH n, f, COUNT(u) AS shares, COUNT(d) AS desmentidos " +
           "RETURN n " +
           "ORDER BY (CASE WHEN f.verificada = true THEN 0.7 ELSE 0.2 END + " +
           "  CASE WHEN shares > 100 THEN -0.3 WHEN shares > 50 THEN -0.1 ELSE 0.1 END + " +
           "  CASE WHEN desmentidos >= 3 THEN -0.5 WHEN desmentidos >= 1 THEN -0.2 ELSE 0.2 END) ASC")
    List<Noticia> findAllWithCredibilityScore();

    @Query("MATCH (n:Noticia {id: $noticiaId})-[:PROVIENE_DE]->(f:Fuente) " +
           "OPTIONAL MATCH (n)<-[:COMPARTE]-(u:Usuario) " +
           "WITH n, f, COUNT(u) AS shares " +
           "OPTIONAL MATCH (c:Claim)<-[:AFIRMA]-(n) " +
           "OPTIONAL MATCH (c)<-[:DESMIENTE]-(d:Noticia)-[:PROVIENE_DE]->(df:Fuente) " +
           "WHERE df.verificada = true " +
           "WITH n, f, shares, COUNT(d) AS desmentidos " +
           "RETURN n.id AS noticiaId, n.titulo AS titulo, f.nombre AS fuente, " +
           "  f.verificada AS fuenteVerificada, shares, desmentidos, " +
           "  CASE " +
           "    WHEN f.verificada = true THEN 0.4 ELSE 0.1 " +
           "  END + " +
           "  CASE " +
           "    WHEN shares > 100 THEN -0.3 WHEN shares > 50 THEN -0.1 ELSE 0.1 " +
           "  END + " +
           "  CASE " +
           "    WHEN desmentidos >= 3 THEN -0.5 WHEN desmentidos >= 1 THEN -0.2 ELSE 0.2 " +
           "  END AS scoreCredibilidad")
    Optional<CredibilidadResult> findCredibilidadById(String noticiaId);

    @Query("MATCH (n:Noticia {id: $noticiaId}) " +
           "OPTIONAL MATCH (n)<-[:COMPARTE]-(u:Usuario) " +
           "RETURN n.titulo AS titulo, COLLECT(u.nombre) AS usuarios, " +
           "       COUNT(u) AS totalShares")
    Optional<DifusionResult> findDifusionById(String noticiaId);

    @Query(value = "MATCH (n:Noticia)-[:PROVIENE_DE]->(f:Fuente) " +
           "WHERE f.verificada = false " +
           "RETURN n " +
           "ORDER BY n.fechaPublicacion DESC",
           countQuery = "MATCH (n:Noticia)-[:PROVIENE_DE]->(f:Fuente) " +
                        "WHERE f.verificada = false RETURN COUNT(n)")
    Page<Noticia> findNoticiasNoVerificadas(Pageable pageable);

    @Query(value = "MATCH (n:Noticia) " +
           "RETURN n ORDER BY n.scoreCredibilidad ASC",
           countQuery = "MATCH (n:Noticia) RETURN COUNT(n)")
    Page<Noticia> findAllOrderByScore(Pageable pageable);
}

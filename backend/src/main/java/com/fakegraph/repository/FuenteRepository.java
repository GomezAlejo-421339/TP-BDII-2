package com.fakegraph.repository;

import com.fakegraph.model.Fuente;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface FuenteRepository extends Neo4jRepository<Fuente, String> {

    List<Fuente> findByVerificadaFalse();

    @Query("MATCH (f:Fuente)<-[:PROVIENE_DE]-(n:Noticia) " +
           "WHERE f.verificada = false " +
           "RETURN f, COUNT(n) AS noticiaCount " +
           "ORDER BY noticiaCount DESC")
    List<Fuente> findFuentesNoVerificadasConConteo();
}

package com.fakegraph.repository;

import com.fakegraph.model.nodos.Fuente;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

public interface FuenteRepository extends Neo4jRepository<Fuente, Long> {

    @Query("MERGE (f:Fuente {dominio: $dominio}) " +
           "ON CREATE SET f.nombre = $dominio, f.verificada = false, f.scoreCredibilidad = 0.5 " +
           "RETURN f")
    Fuente mergeByDominio(String dominio);
}

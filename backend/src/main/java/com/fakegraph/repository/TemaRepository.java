package com.fakegraph.repository;

import com.fakegraph.model.nodos.Tema;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

public interface TemaRepository extends Neo4jRepository<Tema, Long> {

    @Query("MERGE (t:Tema {nombre: $nombre}) RETURN t")
    Tema mergeByNombre(String nombre);
}

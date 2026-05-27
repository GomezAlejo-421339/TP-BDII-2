package com.fakegraph.repository;

import com.fakegraph.model.nodos.Fuente;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface FuenteRepository extends Neo4jRepository<Fuente,Long> {
}

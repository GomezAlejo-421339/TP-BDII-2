package com.fakegraph.repository;

import com.fakegraph.model.nodos.Autor;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface AutorRepository extends Neo4jRepository<Autor, Long> {
}

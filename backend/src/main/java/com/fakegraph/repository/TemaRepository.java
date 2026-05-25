package com.fakegraph.repository;

import com.fakegraph.model.Tema;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface TemaRepository extends Neo4jRepository<Tema, String> {
}

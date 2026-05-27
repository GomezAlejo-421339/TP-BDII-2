package com.fakegraph.repository;

import com.fakegraph.model.nodos.Usuario;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface UsuarioRepository extends Neo4jRepository<Usuario,Long> {
}

package com.fakegraph.repository;

import com.fakegraph.model.Usuario;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;

public interface UsuarioRepository extends Neo4jRepository<Usuario, String> {

    @Query("CALL gds.graph.project($graphName, " +
           "  '(n:Usuario)-[:COMPARTE]->()', " +
           "  '*', " +
           "  {undirectedRelationshipTypes: ['*']}) " +
           "YIELD graphName " +
           "RETURN graphName")
    void projectDifusionGraph(String graphName);

    @Query("CALL gds.louvain.stream($graphName) " +
           "YIELD nodeId, communityId " +
           "WITH communityId, COLLECT(gds.util.asNode(nodeId).nombre) AS miembros " +
           "RETURN communityId, miembros, SIZE(miembros) AS tamano " +
           "ORDER BY tamano DESC")
    List<ComunidadResult> findComunidades(String graphName);
}

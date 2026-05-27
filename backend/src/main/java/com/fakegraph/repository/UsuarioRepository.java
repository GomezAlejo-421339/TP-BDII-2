package com.fakegraph.repository;

import com.fakegraph.model.nodos.Usuario;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

public interface UsuarioRepository extends Neo4jRepository<Usuario,Long> {
    
    @Query("MATCH (u:Usuario), (n:Noticia) " +
           "WHERE id(u) = $usuarioId AND id(n) = $noticiaId " +
           "MERGE (u)-[:POSTEO {fecha: datetime()}]->(n)")
    void linkPosteo(Long usuarioId, Long noticiaId);

    boolean existsByEmail(String email);

    java.util.Optional<Usuario> findByEmail(String email);

    @Query("MATCH (n:Noticia)<-[:VOTO]-(u:Usuario) WHERE id(n) = $noticiaId " +
           "MATCH (u)-[v:VOTO]->(n2:Noticia) " +
           "WITH u, count(v) as total, " +
           "sum(case when v.tipoVoto = 'VERDADERO' then (1.0 - abs(1.0 - n2.scoreCredibilidad)) " +
           "         when v.tipoVoto = 'FALSO' then (1.0 - abs(0.0 - n2.scoreCredibilidad)) " +
           "         else (1.0 - abs(0.5 - n2.scoreCredibilidad)) end) as sumaAlineacion " +
           "SET u.scoreCredibilidad = toInteger((sumaAlineacion / total) * 100)")
    void recalcularUsuariosQueVotaron(Long noticiaId);
}

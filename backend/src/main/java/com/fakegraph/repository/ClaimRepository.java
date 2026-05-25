package com.fakegraph.repository;

import com.fakegraph.model.Claim;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface ClaimRepository extends Neo4jRepository<Claim, String> {
}

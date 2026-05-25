package com.fakegraph.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@Component
public class DataSeeder implements CommandLineRunner {

    private final org.neo4j.driver.Driver neo4jDriver;

    @Value("${app.seed-data:false}")
    private boolean seedData;

    public DataSeeder(org.neo4j.driver.Driver neo4jDriver) {
        this.neo4jDriver = neo4jDriver;
    }

    @Override
    public void run(String... args) throws Exception {
        try (var session = neo4jDriver.session()) {
            var schemaResource = new ClassPathResource("schema.cypher");
            if (schemaResource.exists()) {
                String schema = new BufferedReader(
                        new InputStreamReader(schemaResource.getInputStream(), StandardCharsets.UTF_8))
                        .lines().collect(Collectors.joining("\n"));
                for (String statement : schema.split(";")) {
                    String trimmed = statement.trim();
                    if (!trimmed.isEmpty()) {
                        session.run(trimmed);
                    }
                }
                System.out.println("Schema Neo4j aplicado correctamente.");
            }

            if (seedData) {
                var seedResource = new ClassPathResource("seed.cypher");
                if (seedResource.exists()) {
                    String seed = new BufferedReader(
                            new InputStreamReader(seedResource.getInputStream(), StandardCharsets.UTF_8))
                            .lines().collect(Collectors.joining("\n"));
                    for (String statement : seed.split(";")) {
                        String trimmed = statement.trim();
                        if (!trimmed.isEmpty()) {
                            session.run(trimmed);
                        }
                    }
                    System.out.println("Seed data cargada correctamente.");
                }
            }
        }
    }
}

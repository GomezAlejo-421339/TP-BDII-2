package com.fakegraph.service;

import com.fakegraph.DTO.response.FuenteResponseDTO;
import com.fakegraph.DTO.response.FuenteStatsDTO;
import com.fakegraph.model.nodos.Fuente;
import com.fakegraph.repository.FuenteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FuenteService {
    private final FuenteRepository fuenteRepository;
    private final Neo4jClient neo4jClient;

    @Transactional(readOnly = true)
    public List<FuenteResponseDTO> listarFuentes() {
        return fuenteRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public FuenteResponseDTO marcarVerificada(Long id) {
        Fuente f = fuenteRepository.findById(id)
                .orElseThrow(() -> new com.fakegraph.exception.FuenteNotFoundException(id));
        f.setVerificada(true);
        return toDTO(fuenteRepository.save(f));
    }

    @Transactional(readOnly = true)
    public List<FuenteStatsDTO> obtenerEstadisticasPorFuente() {
        return (List<FuenteStatsDTO>) neo4jClient.query(
                "MATCH (n:Noticia)-[:PUBLICADA_EN]->(f:Fuente) " +
                "RETURN f.nombre AS nombre, count(n) AS cantidadNoticias, avg(n.scoreCredibilidad) as credibilidadPromedio " +
                "ORDER BY cantidadNoticias DESC")
                .fetchAs(FuenteStatsDTO.class)
                .mappedBy((typeSystem, record) -> {
                    FuenteStatsDTO dto = new FuenteStatsDTO();
                    dto.setNombre(record.get("nombre").asString());
                    dto.setCantidadNoticias(record.get("cantidadNoticias").asLong());
                    dto.setCredibilidadPromedio(record.get("credibilidadPromedio").asDouble());
                    return dto;
                }).all();
    }

    private FuenteResponseDTO toDTO(Fuente f) {
        FuenteResponseDTO dto = new FuenteResponseDTO();
        dto.setId(f.getId());
        dto.setNombre(f.getNombre());
        dto.setDominio(f.getDominio());
        dto.setVerificada(f.isVerificada());
        dto.setScoreCredibilidad(f.getScoreCredibilidad());
        return dto;
    }
}

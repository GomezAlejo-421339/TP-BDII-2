package com.fakegraph.controller;

import com.fakegraph.DTO.response.FuenteResponseDTO;
import com.fakegraph.DTO.response.FuenteStatsDTO;
import com.fakegraph.service.FuenteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/fuentes", "/api/v1/fuentes"})
@RequiredArgsConstructor
public class FuenteController {
    
    private final FuenteService fuenteService;

    @GetMapping
    public ResponseEntity<List<FuenteResponseDTO>> listarFuentes() {
        return ResponseEntity.ok(fuenteService.listarFuentes());
    }

    @PutMapping("/{id}/verificar")
    public ResponseEntity<FuenteResponseDTO> marcarVerificada(@PathVariable Long id) {
        return ResponseEntity.ok(fuenteService.marcarVerificada(id));
    }

    @GetMapping("/stats")
    public ResponseEntity<List<FuenteStatsDTO>> obtenerEstadisticas() {
        return ResponseEntity.ok(fuenteService.obtenerEstadisticasPorFuente());
    }
}

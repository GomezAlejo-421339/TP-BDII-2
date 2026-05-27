package com.fakegraph.controller;

import com.fakegraph.service.EstadisticasService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/estadisticas", "/api/v1/estadisticas"})
@RequiredArgsConstructor
public class EstadisticasController {

    private final EstadisticasService estadisticasService;

    @GetMapping({"/resumen", "/resumen-bd"})
    public ResponseEntity<Map<String, Object>> getResumen() {
        return ResponseEntity.ok(estadisticasService.getResumen());
    }

    @GetMapping("/distribucion")
    public ResponseEntity<List<Map<String, Object>>> getDistribucionCredibilidad() {
        return ResponseEntity.ok(estadisticasService.getDistribucionCredibilidad());
    }

    @GetMapping("/por-fuente")
    public ResponseEntity<List<Map<String, Object>>> getNoticiasPorFuente() {
        return ResponseEntity.ok(estadisticasService.getNoticiasPorFuente());
    }

    @GetMapping("/por-tema")
    public ResponseEntity<List<Map<String, Object>>> getNoticiasPorTema() {
        return ResponseEntity.ok(estadisticasService.getNoticiasPorTema());
    }

    @GetMapping({"/usuarios-activos", "/usuarios-top"})
    public ResponseEntity<List<Map<String, Object>>> getTopUsuariosActivos() {
        return ResponseEntity.ok(estadisticasService.getTopUsuariosActivos());
    }

    @GetMapping("/tendencia")
    public ResponseEntity<List<Map<String, Object>>> getTendenciaTemporal() {
        return ResponseEntity.ok(estadisticasService.getTendenciaTemporal());
    }

    @GetMapping("/recomendaciones/{usuarioId}")
    public ResponseEntity<List<Map<String, Object>>> getRecomendaciones(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(estadisticasService.getRecomendacionesParaUsuario(usuarioId));
    }
}

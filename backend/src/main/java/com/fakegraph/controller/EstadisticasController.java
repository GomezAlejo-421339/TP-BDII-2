package com.fakegraph.controller;

import com.fakegraph.repository.*;
import com.fakegraph.service.EstadisticasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/estadisticas")
public class EstadisticasController {

    private final EstadisticasService estadisticasService;

    public EstadisticasController(EstadisticasService estadisticasService) {
        this.estadisticasService = estadisticasService;
    }

    @GetMapping("/resumen")
    public ResponseEntity<ResumenStats> obtenerResumen() {
        return ResponseEntity.ok(estadisticasService.obtenerResumen());
    }

    @GetMapping("/endpoints")
    public ResponseEntity<List<EndpointStats>> obtenerRankingEndpoints() {
        return ResponseEntity.ok(estadisticasService.obtenerRankingEndpoints());
    }

    @GetMapping("/errores")
    public ResponseEntity<List<ErrorStats>> obtenerErrores() {
        return ResponseEntity.ok(estadisticasService.obtenerErrores());
    }

    @GetMapping("/historial")
    public ResponseEntity<List<HistorialStats>> obtenerHistorial(
            @RequestParam(defaultValue = "24") int horas) {
        return ResponseEntity.ok(estadisticasService.obtenerHistorial(horas));
    }

    @GetMapping("/resumen-bd")
    public ResponseEntity<ResumenDBStats> obtenerResumenBD() {
        return ResponseEntity.ok(estadisticasService.obtenerResumenDB());
    }

    @GetMapping("/distribucion")
    public ResponseEntity<List<DistribucionCredibilidad>> obtenerDistribucion() {
        return ResponseEntity.ok(estadisticasService.obtenerDistribucion());
    }

    @GetMapping("/por-fuente")
    public ResponseEntity<List<NoticiasPorFuenteStats>> obtenerPorFuente() {
        return ResponseEntity.ok(estadisticasService.obtenerNoticiasPorFuente());
    }

    @GetMapping("/por-tema")
    public ResponseEntity<List<NoticiasPorTemaStats>> obtenerPorTema() {
        return ResponseEntity.ok(estadisticasService.obtenerNoticiasPorTema());
    }

    @GetMapping("/usuarios-top")
    public ResponseEntity<List<TopUsuarioStats>> obtenerTopUsuarios() {
        return ResponseEntity.ok(estadisticasService.obtenerTopUsuarios());
    }

    @GetMapping("/tendencia")
    public ResponseEntity<List<TendenciaStats>> obtenerTendencia() {
        return ResponseEntity.ok(estadisticasService.obtenerTendencia());
    }
}

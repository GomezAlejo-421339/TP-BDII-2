package com.fakegraph.controller;

import com.fakegraph.repository.ComunidadResult;
import com.fakegraph.service.ComunidadService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/grafos")
public class ComunidadController {

    private final ComunidadService comunidadService;

    public ComunidadController(ComunidadService comunidadService) {
        this.comunidadService = comunidadService;
    }

    @GetMapping("/comunidades")
    public ResponseEntity<List<ComunidadResult>> obtenerComunidades() {
        return ResponseEntity.ok(comunidadService.detectarComunidades());
    }
}

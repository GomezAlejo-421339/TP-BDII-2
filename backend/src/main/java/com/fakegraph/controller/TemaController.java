package com.fakegraph.controller;

import com.fakegraph.DTO.requests.TemaRequestDTO;
import com.fakegraph.model.Tema;
import com.fakegraph.service.TemaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/temas")
public class TemaController {

    private final TemaService temaService;

    public TemaController(TemaService temaService) {
        this.temaService = temaService;
    }

    @GetMapping
    public ResponseEntity<List<Tema>> listarTemas() {
        return ResponseEntity.ok(temaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tema> obtenerTema(@PathVariable String id) {
        return temaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Tema> crearTema(@RequestBody TemaRequestDTO tema) {
        return ResponseEntity.ok(temaService.save(tema));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tema> actualizarTema(@PathVariable String id, @RequestBody TemaRequestDTO tema) {
        return ResponseEntity.ok(temaService.update(id, tema));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTema(@PathVariable String id) {
        temaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

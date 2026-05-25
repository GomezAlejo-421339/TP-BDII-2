package com.fakegraph.controller;

import com.fakegraph.model.Fuente;
import com.fakegraph.service.FuenteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/fuentes")
public class FuenteController {

    private final FuenteService fuenteService;

    public FuenteController(FuenteService fuenteService) {
        this.fuenteService = fuenteService;
    }

    @GetMapping
    public ResponseEntity<List<Fuente>> listarFuentes() {
        return ResponseEntity.ok(fuenteService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fuente> obtenerFuente(@PathVariable String id) {
        return fuenteService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Fuente> crearFuente(@RequestBody Fuente fuente) {
        return ResponseEntity.ok(fuenteService.save(fuente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fuente> actualizarFuente(@PathVariable String id, @RequestBody Fuente fuente) {
        return ResponseEntity.ok(fuenteService.update(id, fuente));
    }

    @PutMapping("/{id}/verificar")
    public ResponseEntity<Fuente> verificarFuente(
            @PathVariable String id,
            @RequestParam boolean verificada) {
        return ResponseEntity.ok(fuenteService.verificar(id, verificada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarFuente(@PathVariable String id) {
        fuenteService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/no-verificadas")
    public ResponseEntity<List<Fuente>> listarNoVerificadas() {
        return ResponseEntity.ok(fuenteService.findNoVerificadas());
    }
}

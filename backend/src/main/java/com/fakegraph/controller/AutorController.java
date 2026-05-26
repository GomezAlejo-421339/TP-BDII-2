package com.fakegraph.controller;

import com.fakegraph.DTO.requests.AutorRequestDTO;
import com.fakegraph.model.Autor;
import com.fakegraph.service.AutorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/autores")
public class AutorController {

    private final AutorService autorService;

    public AutorController(AutorService autorService) {
        this.autorService = autorService;
    }

    @GetMapping
    public ResponseEntity<List<Autor>> listarAutores() {
        return ResponseEntity.ok(autorService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Autor> obtenerAutor(@PathVariable String id) {
        return autorService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Autor> crearAutor(@RequestBody AutorRequestDTO autor) {
        return ResponseEntity.ok(autorService.save(autor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Autor> actualizarAutor(@PathVariable String id, @RequestBody AutorRequestDTO autor) {
        return ResponseEntity.ok(autorService.update(id, autor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAutor(@PathVariable String id) {
        autorService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

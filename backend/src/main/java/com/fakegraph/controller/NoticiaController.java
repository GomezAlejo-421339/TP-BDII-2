package com.fakegraph.controller;

import com.fakegraph.model.Noticia;
import com.fakegraph.repository.CredibilidadResult;
import com.fakegraph.repository.DifusionResult;
import com.fakegraph.service.NoticiaService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/noticias")
public class NoticiaController {

    private final NoticiaService noticiaService;

    public NoticiaController(NoticiaService noticiaService) {
        this.noticiaService = noticiaService;
    }

    @GetMapping
    public ResponseEntity<Page<Noticia>> listarNoticias(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "fechaPublicacion") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        return ResponseEntity.ok(noticiaService.findAllPaginated(page, size, sortBy, direction));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Noticia> obtenerNoticia(@PathVariable String id) {
        return noticiaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Noticia> crearNoticia(@RequestBody Noticia noticia) {
        return ResponseEntity.ok(noticiaService.save(noticia));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Noticia> actualizarNoticia(@PathVariable String id, @RequestBody Noticia noticia) {
        return ResponseEntity.ok(noticiaService.update(id, noticia));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarNoticia(@PathVariable String id) {
        noticiaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/credibilidad")
    public ResponseEntity<CredibilidadResult> obtenerCredibilidad(@PathVariable String id) {
        return noticiaService.findCredibilidadById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/difusion")
    public ResponseEntity<DifusionResult> obtenerDifusion(@PathVariable String id) {
        return noticiaService.findDifusionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/sospechosas")
    public ResponseEntity<List<Noticia>> listarSospechosas(
            @RequestParam(defaultValue = "50") int minShares) {
        return ResponseEntity.ok(noticiaService.findSuspiciousByShares(minShares));
    }

    @GetMapping("/credibilidad")
    public ResponseEntity<List<Noticia>> listarConCredibilidad() {
        return ResponseEntity.ok(noticiaService.findAllWithCredibilityScore());
    }

    @GetMapping("/no-verificadas")
    public ResponseEntity<Page<Noticia>> listarNoVerificadas(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(noticiaService.findNoticiasNoVerificadas(page, size));
    }
}

package com.fakegraph.controller;

import com.fakegraph.DTO.requests.NoticiaRequestDTO;
import com.fakegraph.DTO.requests.VotoRequest;
import com.fakegraph.DTO.response.NoticiaResponseDTO;
import com.fakegraph.service.NoticiaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/noticias")
@RequiredArgsConstructor
public class NoticiaController {
    
    private final NoticiaService noticiaService;

    @PostMapping
    public ResponseEntity<NoticiaResponseDTO> postearNoticia(
            @RequestBody NoticiaRequestDTO request,
            @RequestHeader(value = "X-User-Id", required = false) Long usuarioId) {
        
        if (usuarioId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        NoticiaResponseDTO response = noticiaService.postearNoticia(request, usuarioId);
        if (response.isYaExistia()) {
            // Devuelve 200 OK en vez de 201 Created para indicar que ya existía
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<Page<NoticiaResponseDTO>> listarNoticias(Pageable pageable) {
        return ResponseEntity.ok(noticiaService.listarNoticias(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoticiaResponseDTO> obtenerNoticia(@PathVariable Long id) {
        return ResponseEntity.ok(noticiaService.obtenerPorId(id));
    }

    @PostMapping("/{id}/votar")
    public ResponseEntity<NoticiaResponseDTO> votar(
            @PathVariable Long id,
            @RequestBody VotoRequest request,
            @RequestHeader(value = "X-User-Id", required = false) Long usuarioId) {
            
        if (usuarioId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        return ResponseEntity.ok(noticiaService.votar(id, usuarioId, request));
    }

    @PostMapping("/{id}/repostear")
    public ResponseEntity<Void> repostear(
            @PathVariable Long id,
            @RequestHeader(value = "X-User-Id", required = false) Long usuarioId) {
            
        if (usuarioId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        noticiaService.repostear(id, usuarioId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/{id}/credibilidad")
    public ResponseEntity<java.util.Map<String, Object>> getCredibilidad(@PathVariable Long id) {
        return ResponseEntity.ok(noticiaService.obtenerDesgloseCredibilidad(id));
    }

    @GetMapping("/{id}/difusion")
    public ResponseEntity<java.util.Map<String, Object>> getDifusion(@PathVariable Long id) {
        return ResponseEntity.ok(noticiaService.obtenerDesgloseDifusion(id));
    }
    
    @GetMapping("/sospechosas")
    public ResponseEntity<Iterable<NoticiaResponseDTO>> listarSospechosas() {
        return ResponseEntity.ok(noticiaService.listarSospechosas());
    }
}

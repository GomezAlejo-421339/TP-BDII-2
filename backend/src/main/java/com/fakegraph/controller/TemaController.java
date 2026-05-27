package com.fakegraph.controller;

import com.fakegraph.DTO.requests.TemaRequestDTO;
import com.fakegraph.DTO.response.TemaResponseDTO;
import com.fakegraph.service.TemaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/temas", "/api/v1/temas"})
@RequiredArgsConstructor
public class TemaController {
    private final TemaService service;

    @PostMapping
    public ResponseEntity<TemaResponseDTO> create(@RequestBody TemaRequestDTO request) {
        return ResponseEntity.ok(service.create(request));
    }

    @GetMapping
    public ResponseEntity<List<TemaResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}

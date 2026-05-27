package com.fakegraph.controller;

import com.fakegraph.DTO.requests.AutorRequestDTO;
import com.fakegraph.DTO.requests.AutorResponseDTO;
import com.fakegraph.DTO.requests.AutorUpdateRequestDTO;
import com.fakegraph.service.AutorSerivce;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("autores")
@RequiredArgsConstructor
public class AutorController {
    private final AutorSerivce serivce;

    @PostMapping
    public ResponseEntity<AutorResponseDTO> create(@RequestBody AutorRequestDTO request) {
        return ResponseEntity.ok(serivce.create(request));
    }

    @GetMapping
    public ResponseEntity<List<AutorResponseDTO>> getAll() {
        return ResponseEntity.ok(serivce.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AutorResponseDTO> getById(@PathVariable String id) {
        return ResponseEntity.ok(serivce.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AutorResponseDTO> update(@PathVariable String id,@RequestBody AutorRequestDTO request) {
        return ResponseEntity.ok(serivce.update(id, request));
    }

    @DeleteMapping("/{id}")
    public void update(@PathVariable String id) {
        serivce.delete(id);
    }
}

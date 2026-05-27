package com.fakegraph.controller;

import com.fakegraph.DTO.requests.TemaRequestDTO;
import com.fakegraph.DTO.response.TemaResponseDTO;
import com.fakegraph.service.TemaService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("temas")
@RequiredArgsConstructor
public class TemaController {
    private final TemaService service;

    @PostMapping
    public ResponseEntity<TemaResponseDTO> create(@RequestBody TemaRequestDTO request) {
        System.out.println("AAAAAAAAAAA "+ request.getNombre());
        return ResponseEntity.ok(service.crete(request));
    }


    @GetMapping
    public ResponseEntity<List<TemaResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}

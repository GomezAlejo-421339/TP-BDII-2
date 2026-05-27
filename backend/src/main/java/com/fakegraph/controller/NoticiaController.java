package com.fakegraph.controller;

import com.fakegraph.DTO.requests.NoticiaRequestDTO;
import com.fakegraph.DTO.response.NoticiaResponseDTO;
import com.fakegraph.service.NoticiaSerive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("noticias")
@RequiredArgsConstructor
public class NoticiaController {
    private final NoticiaSerive serive;

    @PostMapping
    public ResponseEntity<NoticiaResponseDTO> create(@RequestBody NoticiaRequestDTO request) {
        return ResponseEntity.ok(serive.create(request));
    }
}

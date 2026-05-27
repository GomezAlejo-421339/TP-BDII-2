package com.fakegraph.controller;

import com.fakegraph.DTO.requests.UsuarioRequestDTO;
import com.fakegraph.DTO.response.UsuarioResponseDTO;
import com.fakegraph.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("usuarios")
@RequiredArgsConstructor
public class UserController {
    private final UsuarioService service;

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> registrarUsuario(@RequestBody UsuarioRequestDTO request) {
        return ResponseEntity.ok(service.register(request));
    }


}

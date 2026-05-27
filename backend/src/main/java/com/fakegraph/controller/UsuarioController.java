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
@RequestMapping({"/api/usuarios", "/api/v1/usuarios"})
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioService service;

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> registrarUsuario(@RequestBody UsuarioRequestDTO request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioResponseDTO> login(@RequestBody com.fakegraph.DTO.requests.LoginRequestDTO request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("El email es requerido");
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("La contraseña es requerida");
        }
        return ResponseEntity.ok(service.login(request.getEmail(), request.getPassword()));
    }

    @org.springframework.web.bind.annotation.GetMapping
    public ResponseEntity<java.util.List<UsuarioResponseDTO>> listarUsuarios() {
        return ResponseEntity.ok(service.listarUsuarios());
    }
}

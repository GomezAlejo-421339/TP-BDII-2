package com.fakegraph.service;

import com.fakegraph.DTO.requests.UsuarioRequestDTO;
import com.fakegraph.DTO.response.UsuarioResponseDTO;
import com.fakegraph.model.nodos.Usuario;
import com.fakegraph.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository repository;

    public UsuarioResponseDTO register(UsuarioRequestDTO request) {
        Usuario u = new Usuario();
        u.setEmail(request.getEmail());
        u.setNombre(request.getNombre());
        u.setScoreCredibility(0);

        Usuario usuario = repository.save(u);
        UsuarioResponseDTO response = toUsuarioResponseDTO(usuario);
        return response;
    }

    private UsuarioResponseDTO toUsuarioResponseDTO(Usuario u) {
        UsuarioResponseDTO response = new UsuarioResponseDTO();
        response.setId(u.getId());
        response.setNombre(u.getNombre());
        response.setEmail(u.getEmail());
        return response;
    }
}

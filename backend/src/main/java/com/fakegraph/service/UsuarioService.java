package com.fakegraph.service;

import com.fakegraph.DTO.requests.UsuarioRequestDTO;
import com.fakegraph.DTO.response.UsuarioResponseDTO;
import com.fakegraph.model.nodos.Usuario;
import com.fakegraph.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository repository;

    @Transactional
    public UsuarioResponseDTO register(UsuarioRequestDTO request) {
        if (repository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("El correo electrónico ya está registrado");
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("La contraseña es obligatoria");
        }

        Usuario u = new Usuario();
        u.setEmail(request.getEmail());
        u.setNombre(request.getNombre());
        u.setScoreCredibilidad(50); // Inicialización neutral en 50
        u.setSeguidores(0);
        u.setAntiguedadDias(1);
        u.setPasswordHash(com.fakegraph.utils.PasswordUtils.hashPassword(request.getPassword()));

        Usuario usuario = repository.save(u);
        UsuarioResponseDTO response = toUsuarioResponseDTO(usuario);
        return response;
    }

    @Transactional(readOnly = true)
    public UsuarioResponseDTO login(String email, String password) {
        Usuario usuario = repository.findByEmail(email)
                .orElseThrow(() -> new com.fakegraph.exception.ResourceNotFoundException("El correo electrónico no está registrado"));
        
        if (!com.fakegraph.utils.PasswordUtils.checkPassword(password, usuario.getPasswordHash())) {
            throw new IllegalArgumentException("Contraseña incorrecta");
        }
        
        return toUsuarioResponseDTO(usuario);
    }

    @Transactional(readOnly = true)
    public java.util.List<UsuarioResponseDTO> listarUsuarios() {
        return repository.findAll().stream().map(this::toUsuarioResponseDTO).toList();
    }

    private UsuarioResponseDTO toUsuarioResponseDTO(Usuario u) {
        UsuarioResponseDTO response = new UsuarioResponseDTO();
        response.setId(u.getId());
        response.setNombre(u.getNombre());
        response.setEmail(u.getEmail());
        response.setScoreCredibilidad(u.getScoreCredibilidad());
        response.setSeguidores(u.getSeguidores() != null ? u.getSeguidores() : 0);
        response.setAntiguedadDias(u.getAntiguedadDias() != null ? u.getAntiguedadDias() : 1);
        return response;
    }
}

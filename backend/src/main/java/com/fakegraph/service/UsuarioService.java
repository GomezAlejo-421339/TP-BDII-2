package com.fakegraph.service;

import com.fakegraph.model.Usuario;
import com.fakegraph.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional(readOnly = true)
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Usuario> findById(String id) {
        return usuarioRepository.findById(id);
    }

    @Transactional
    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public Usuario update(String id, Usuario usuario) {
        Usuario existente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + id));
        existente.setNombre(usuario.getNombre());
        existente.setSeguidores(usuario.getSeguidores());
        existente.setAntiguedadDias(usuario.getAntiguedadDias());
        return usuarioRepository.save(existente);
    }

    @Transactional
    public void deleteById(String id) {
        usuarioRepository.deleteById(id);
    }
}

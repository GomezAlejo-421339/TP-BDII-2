package com.fakegraph.service;

import com.fakegraph.repository.ComunidadResult;
import com.fakegraph.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComunidadService {

    private final UsuarioRepository usuarioRepository;

    public ComunidadService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<ComunidadResult> detectarComunidades() {
        String graphName = "difusion_" + System.currentTimeMillis();
        usuarioRepository.projectDifusionGraph(graphName);
        return usuarioRepository.findComunidades(graphName);
    }
}

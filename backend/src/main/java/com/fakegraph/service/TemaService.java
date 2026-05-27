package com.fakegraph.service;

import com.fakegraph.DTO.requests.TemaRequestDTO;
import com.fakegraph.DTO.response.TemaResponseDTO;
import com.fakegraph.model.nodos.Tema;
import com.fakegraph.repository.TemaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TemaService {
    private final TemaRepository repository;

    public TemaResponseDTO crete(TemaRequestDTO request) {
        Tema t = new Tema();
        t.setNombre(request.getNombre());

        Tema tema = repository.save(t);
        return toTemaResponseDTO(tema);
    }

    private TemaResponseDTO toTemaResponseDTO(Tema t) {
        TemaResponseDTO response = new TemaResponseDTO();
        response.setNombre(t.getNombre());
        response.setId(t.getId());
        return response;
    }

    public List<TemaResponseDTO> getAll() {
        List<Tema> temas = repository.findAll();
        return temas.stream().map(this::toTemaResponseDTO).toList();
    }
}

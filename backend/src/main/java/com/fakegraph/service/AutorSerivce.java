package com.fakegraph.service;

import com.fakegraph.DTO.requests.AutorRequestDTO;
import com.fakegraph.DTO.requests.AutorResponseDTO;
import com.fakegraph.DTO.requests.AutorUpdateRequestDTO;
import com.fakegraph.model.nodos.Autor;
import com.fakegraph.repository.AutorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AutorSerivce {
    private final AutorRepository repository;

    public AutorResponseDTO create(AutorRequestDTO request) {
        Autor a =new Autor();
        a.setBiografia(request.getBiografia());
        a.setNombre(request.getNombre());
        a.setScoreCredibilidad(0);

        Autor autor = repository.save(a);
        return toAutorResponseDTO(autor);
    }

    public List<AutorResponseDTO> getAll() {
        List<Autor> autores = repository.findAll();
        return autores.stream().map(this::toAutorResponseDTO).toList();
    }

    public AutorResponseDTO update(String id, AutorRequestDTO request) {
        Autor a = repository.findById(Long.parseLong(id))
                .orElseThrow(() -> new RuntimeException("EL autor con id "+id+" no fue encontrado"));
        a.setBiografia(request.getBiografia());
        a.setNombre(request.getNombre());

        repository.save(a);

        return toAutorResponseDTO(a);
    }

    private AutorResponseDTO toAutorResponseDTO(Autor a) {
        AutorResponseDTO response = new AutorResponseDTO();
        response.setBiografia(a.getBiografia());
        response.setNombre(a.getNombre());
        response.setScoreCredibilidad(a.getScoreCredibilidad());
        response.setId(a.getId());
        return response;
    }

    public AutorResponseDTO getById(String id) {
        Autor a =repository.findById(Long.parseLong(id))
                .orElseThrow(() -> new RuntimeException("No se encontro el autor con id "+id));
        return  toAutorResponseDTO(a);
    }

    public void delete(String id) {
        repository.deleteById(Long.parseLong(id));
    }
}

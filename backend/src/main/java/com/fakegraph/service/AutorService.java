package com.fakegraph.service;

import com.fakegraph.DTO.requests.AutorRequestDTO;
import com.fakegraph.model.Autor;
import com.fakegraph.repository.AutorRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class AutorService {

    private final AutorRepository autorRepository;

    public AutorService(AutorRepository autorRepository) {
        this.autorRepository = autorRepository;
    }

    @Transactional(readOnly = true)
    public List<Autor> findAll() {
        return autorRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Autor> findById(String id) {
        return autorRepository.findById(id);
    }

    @Transactional
    public Autor save(AutorRequestDTO autorDto) {
        Autor autor = new Autor();
        autor.setId(UUID.randomUUID().toString());
        autor.setHandle(autorDto.getHandle());
        autor.setNombre(autorDto.getNombre());
        log.info("-*- Autor guardado: "+autor.getNombre()+" "+autor.getHandle());
        return autorRepository.save(autor);
    }

    @Transactional
    public Autor update(String id, AutorRequestDTO autor) {
        Autor existente = autorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Autor no encontrado: " + id));
        existente.setNombre(autor.getNombre());
        existente.setHandle(autor.getHandle());
        log.info("Autor actualizado: "+existente.getHandle()+" "+existente.getNombre());
        return autorRepository.save(existente);
    }

    @Transactional
    public void deleteById(String id) {
        autorRepository.deleteById(id);
    }
}

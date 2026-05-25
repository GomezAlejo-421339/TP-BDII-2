package com.fakegraph.service;

import com.fakegraph.model.Autor;
import com.fakegraph.repository.AutorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
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
    public Autor save(Autor autor) {
        return autorRepository.save(autor);
    }

    @Transactional
    public Autor update(String id, Autor autor) {
        Autor existente = autorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Autor no encontrado: " + id));
        existente.setNombre(autor.getNombre());
        existente.setHandle(autor.getHandle());
        return autorRepository.save(existente);
    }

    @Transactional
    public void deleteById(String id) {
        autorRepository.deleteById(id);
    }
}

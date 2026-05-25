package com.fakegraph.service;

import com.fakegraph.model.Tema;
import com.fakegraph.repository.TemaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TemaService {

    private final TemaRepository temaRepository;

    public TemaService(TemaRepository temaRepository) {
        this.temaRepository = temaRepository;
    }

    @Transactional(readOnly = true)
    public List<Tema> findAll() {
        return temaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Tema> findById(String id) {
        return temaRepository.findById(id);
    }

    @Transactional
    public Tema save(Tema tema) {
        return temaRepository.save(tema);
    }

    @Transactional
    public Tema update(String id, Tema tema) {
        Tema existente = temaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tema no encontrado: " + id));
        existente.setNombre(tema.getNombre());
        return temaRepository.save(existente);
    }

    @Transactional
    public void deleteById(String id) {
        temaRepository.deleteById(id);
    }
}

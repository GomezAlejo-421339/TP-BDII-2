package com.fakegraph.service;

import com.fakegraph.DTO.requests.TemaRequestDTO;
import com.fakegraph.model.Tema;
import com.fakegraph.repository.TemaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
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
    public Tema save(TemaRequestDTO temaDto) {
        Tema tema = new Tema();
        tema.setId(UUID.randomUUID().toString());
        tema.setNombre(temaDto.getNombre());
        log.info("Se creo el tema: "+tema.getNombre());
        return temaRepository.save(tema);
    }

    @Transactional
    public Tema update(String id, TemaRequestDTO temaDto) {
        Tema existente = temaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tema no encontrado: " + id));
        existente.setNombre(temaDto.getNombre());
        log.info("Se Actualizo el tema: "+existente.getNombre());
        return temaRepository.save(existente);
    }

    @Transactional
    public void deleteById(String id) {
        temaRepository.deleteById(id);
    }
}

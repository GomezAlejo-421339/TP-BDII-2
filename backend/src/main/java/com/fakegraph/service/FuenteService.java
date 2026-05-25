package com.fakegraph.service;

import com.fakegraph.model.Fuente;
import com.fakegraph.repository.FuenteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FuenteService {

    private final FuenteRepository fuenteRepository;

    public FuenteService(FuenteRepository fuenteRepository) {
        this.fuenteRepository = fuenteRepository;
    }

    @Transactional(readOnly = true)
    public List<Fuente> findAll() {
        return fuenteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Fuente> findById(String id) {
        return fuenteRepository.findById(id);
    }

    @Transactional
    public Fuente save(Fuente fuente) {
        return fuenteRepository.save(fuente);
    }

    @Transactional
    public Fuente verificar(String id, boolean verificada) {
        Fuente fuente = fuenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fuente no encontrada: " + id));
        fuente.setVerificada(verificada);
        return fuenteRepository.save(fuente);
    }

    @Transactional
    public Fuente update(String id, Fuente fuente) {
        Fuente existente = fuenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fuente no encontrada: " + id));
        existente.setNombre(fuente.getNombre());
        existente.setDominio(fuente.getDominio());
        existente.setPuntajeHistorial(fuente.getPuntajeHistorial());
        return fuenteRepository.save(existente);
    }

    @Transactional
    public void deleteById(String id) {
        fuenteRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Fuente> findNoVerificadas() {
        return fuenteRepository.findByVerificadaFalse();
    }
}

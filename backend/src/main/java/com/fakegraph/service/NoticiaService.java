package com.fakegraph.service;

import com.fakegraph.model.Noticia;
import com.fakegraph.repository.CredibilidadResult;
import com.fakegraph.repository.DifusionResult;
import com.fakegraph.repository.NoticiaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NoticiaService {

    private final NoticiaRepository noticiaRepository;

    public NoticiaService(NoticiaRepository noticiaRepository) {
        this.noticiaRepository = noticiaRepository;
    }

    public List<Noticia> findAll() {
        return noticiaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Page<Noticia> findAllPaginated(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return noticiaRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Optional<Noticia> findById(String id) {
        return noticiaRepository.findById(id);
    }

    @Transactional
    public Noticia save(Noticia noticia) {
        if (noticia.getFechaPublicacion() == null) {
            noticia.setFechaPublicacion(LocalDateTime.now());
        }
        if (noticia.getScoreCredibilidad() == null) {
            noticia.setScoreCredibilidad(0.5);
        }
        return noticiaRepository.save(noticia);
    }

    @Transactional
    public Noticia update(String id, Noticia noticia) {
        Noticia existente = noticiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Noticia no encontrada: " + id));
        existente.setTitulo(noticia.getTitulo());
        existente.setContenido(noticia.getContenido());
        existente.setUrl(noticia.getUrl());
        if (noticia.getScoreCredibilidad() != null) {
            existente.setScoreCredibilidad(noticia.getScoreCredibilidad());
        }
        return noticiaRepository.save(existente);
    }

    @Transactional
    public void deleteById(String id) {
        noticiaRepository.deleteById(id);
    }

    public List<Noticia> findSuspiciousByShares(int minShares) {
        return noticiaRepository.findSuspiciousByShares(minShares);
    }

    public List<Noticia> findAllWithCredibilityScore() {
        return noticiaRepository.findAllWithCredibilityScore();
    }

    @Transactional(readOnly = true)
    public Optional<CredibilidadResult> findCredibilidadById(String noticiaId) {
        return noticiaRepository.findCredibilidadById(noticiaId);
    }

    @Transactional(readOnly = true)
    public Optional<DifusionResult> findDifusionById(String noticiaId) {
        return noticiaRepository.findDifusionById(noticiaId);
    }

    public Page<Noticia> findNoticiasNoVerificadas(int page, int size) {
        return noticiaRepository.findNoticiasNoVerificadas(PageRequest.of(page, size));
    }

    public Optional<Noticia> findByHashContenido(String hash) {
        return noticiaRepository.findByHashContenido(hash);
    }

    public double calcularScoreManual(Noticia noticia) {
        double score = 0.5;
        if (noticia.getFuente() != null && noticia.getFuente().isVerificada()) {
            score += 0.3;
        } else {
            score -= 0.2;
        }
        if (noticia.getDesmiente() != null && !noticia.getDesmiente().isEmpty()) {
            score -= 0.3 * Math.min(noticia.getDesmiente().size(), 3);
        }
        return Math.max(0.0, Math.min(1.0, score));
    }
}
